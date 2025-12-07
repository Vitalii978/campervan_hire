
"use client";

import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import Calendar from '@/components/Calendar/Calendar';
import styles from './BookingForm.module.css';

interface BookingFormProps {
  vehicleName: string; 
}

interface FormData {
  name: string;
  email: string;
  bookingDate: Date | null;
  comment: string;
}

export default function BookingForm({ vehicleName }: BookingFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    bookingDate: null,
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date: Date) => {
    setFormData(prev => ({
      ...prev,
      bookingDate: date
    }));
    setCalendarOpen(false);
  };

  
  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}.${month}.${year}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.bookingDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      

      
      toast.success(`Successfully booked ${vehicleName}! We will contact you soon.`);
      
      
      setFormData({
        name: '',
        email: '',
        bookingDate: null,
        comment: ''
      });

    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to book. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.bookingContainer}>
      <h2 className={styles.bookingTitle}>Book your campervan now</h2>
      <p className={styles.bookingSubtitle}>
        Stay connected! We are always ready to help.
      </p>

      <form onSubmit={handleSubmit} className={styles.bookingForm}>
        
        <div className={styles.formGroup}>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={styles.formInput}
            placeholder="Name *"
            title="Please enter your name"
            required
            disabled={isSubmitting}
            onInvalid={(e) => {
              (e.target as HTMLInputElement).setCustomValidity('Please enter your name');
            }}
            onInput={(e) => {
              (e.target as HTMLInputElement).setCustomValidity('');
            }}
          />
        </div>

        
        <div className={styles.formGroup}>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={styles.formInput}
            placeholder="Email *"
            title="Please enter a valid email address"
            required
            disabled={isSubmitting}
            onInvalid={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.validity.valueMissing) {
                target.setCustomValidity('Please enter your email address');
              } else if (target.validity.typeMismatch) {
                target.setCustomValidity('Please enter a valid email address');
              }
            }}
            onInput={(e) => {
              (e.target as HTMLInputElement).setCustomValidity('');
            }}
          />
        </div>

        
        <div className={styles.formGroup} ref={calendarRef}>
          <div className={styles.dateInputWrapper}>
            <input
              type="text"
              id="bookingDate"
              name="bookingDate"
              value={formatDate(formData.bookingDate)}
              onChange={() => {}} 
              className={styles.formInput}
              placeholder="Booking date *"
              title="Please select a booking date"
              onClick={() => setCalendarOpen(!calendarOpen)}
              readOnly
              required
              disabled={isSubmitting}
              onInvalid={(e) => {
                (e.target as HTMLInputElement).setCustomValidity('Please select a booking date');
              }}
              onInput={(e) => {
                (e.target as HTMLInputElement).setCustomValidity('');
              }}
            />
            
            
            {calendarOpen && (
              <div className={styles.calendarDropdown}>
                <Calendar
                  value={formData.bookingDate || new Date()}
                  onChange={handleDateChange}
                />
              </div>
            )}
          </div>
        </div>

        
        <div className={styles.formGroup}>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            className={`${styles.formInput} ${styles.textarea}`}
            placeholder="Comment"
            rows={4}
            disabled={isSubmitting}
          />
        </div>

        
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Booking...' : 'Send'}
        </button>
      </form>
    </div>
  );
}