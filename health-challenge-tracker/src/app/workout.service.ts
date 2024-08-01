import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Workout {
  userName: string;
  workoutType: string;
  workoutMinutes: number;
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private localStorageKey = 'workouts';
  private workoutsSubject = new BehaviorSubject<Workout[]>(this.getWorkouts());
  workouts$ = this.workoutsSubject.asObservable();

  constructor() {}

  getWorkouts(): Workout[] {
    const workoutsJson = localStorage.getItem(this.localStorageKey);
    return workoutsJson ? JSON.parse(workoutsJson) : [];
  }

  saveWorkout(workout: Workout): void {
    const workouts = this.getWorkouts();
    workouts.push(workout);
    localStorage.setItem(this.localStorageKey, JSON.stringify(workouts));
    this.workoutsSubject.next(workouts); // Notify subscribers of the change
  }
}
