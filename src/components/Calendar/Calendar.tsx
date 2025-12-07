
"use client";

import { useState } from 'react';
import styles from './Calendar.module.css';

interface CalendarProps {
  value: Date;
  onChange: (date: Date) => void;
}

export default function Calendar({ value, onChange }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(value);

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const getCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
     
    const firstDay = new Date(year, month, 1);
    
    const lastDay = new Date(year, month + 1, 0);
    
    const firstDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    
    const prevMonthDays = [];
    if (firstDayOfWeek > 0) {
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        prevMonthDays.push(new Date(year, month - 1, prevMonthLastDay - i));
      }
    }
    
    
    const currentMonthDays = [];
    for (let i = 1; i <= lastDay.getDate(); i++) {
      currentMonthDays.push(new Date(year, month, i));
    }
    
    
    const nextMonthDays = [];
    const totalCells = 35; 
    const remainingCells = totalCells - (prevMonthDays.length + currentMonthDays.length);
    
    for (let i = 1; i <= remainingCells; i++) {
      nextMonthDays.push(new Date(year, month + 1, i));
    }
    
    return [
      ...prevMonthDays.map(day => ({ date: day, type: 'prev' as const })),
      ...currentMonthDays.map(day => ({ date: day, type: 'current' as const })),
      ...nextMonthDays.map(day => ({ date: day, type: 'next' as const }))
    ];
  };

  const calendarDays = getCalendarDays(currentMonth);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  
  const formatMonthYear = (date: Date) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div className={styles.calendarContainer}>
      
      <div className={styles.calendarPointer}></div>
      
      
      <div className={styles.calendarHeader}>
        <button 
          type="button" 
          className={styles.navButton}
          onClick={prevMonth}
          aria-label="Previous month"
        >
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <span className={styles.monthYear}>
          {formatMonthYear(currentMonth)}
        </span>
        
        <button 
          type="button" 
          className={styles.navButton}
          onClick={nextMonth}
          aria-label="Next month"
        >
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      
      <div className={styles.weekDays}>
        {weekDays.map((day) => (
          <div key={day} className={styles.weekDay}>{day}</div>
        ))}
      </div>

      
      <div className={styles.divider}></div>

      
      <div className={styles.daysGrid}>
        {calendarDays.map((dayObj, index) => {
          const { date: day, type } = dayObj;
          const selected = isSameDay(day, value);
          const today = isToday(day);
          
          return (
            <button
              key={index}
              type="button"
              className={`${styles.dayButton} ${
                selected ? styles.selected : ''
              } ${today ? styles.today : ''
              } ${type === 'prev' || type === 'next' ? styles.otherMonth : ''}`}
              onClick={() => onChange(day)}
              disabled={type === 'prev' || type === 'next'}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}