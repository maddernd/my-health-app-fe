import React, { useState, useEffect } from 'react';
import api from '../api/axios';

interface Interval {
  time: string;
  completed: boolean;
  exerciseType: string;
}

interface DaySchedule {
  day: string;
  intervals: Interval[];
}

const Exercise = () => {
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [exerciseType, setExerciseType] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newSchedule = {
        day,
        intervals: [{ time, completed: false, exerciseType }],
      };
      await api.post('/exercise', { schedule: newSchedule }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchSchedule();
    } catch (error: any) {
      console.error('Error setting exercise schedule:', error.response?.data || error.message);

    }
  };

  const fetchSchedule = async () => {
    try {
      const response = await api.get('/exercise', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSchedule(response.data);
    } catch (error: any) {
      console.error('Error fetching exercise schedule:', error.response?.data || error.message);

    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <div>
      <h1>Exercise Schedule</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Day</label>
          <input
            type="text"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Time</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Exercise Type</label>
          <input
            type="text"
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value)}
            required
          />
        </div>
        <button type="submit">Set Schedule</button>
      </form>
      <ul>
        {schedule.map((daySchedule, index) => (
          <li key={index}>
            {daySchedule.day}
            <ul>
              {daySchedule.intervals.map((interval, idx) => (
                <li key={idx}>
                  {interval.time} - {interval.completed ? 'Completed' : 'Not Completed'} - {interval.exerciseType}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Exercise;
