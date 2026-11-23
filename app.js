/**
 * RENEW - AI-Powered Addiction Recovery & Wellness Platform
 * "Every Day Sober. Every Step Stronger."
 * 
 * Complete Full-Stack Prototype Application Architecture
 * Includes: Patient Portal, Clinical Admin Portal, Role-Based Access,
 * Craving SOS Engine, AI Recovery Companion, Interactive Charts,
 * Web Audio Guided Breathing Chimes, Gamification & LocalStorage Persistence.
 */

// ==========================================
// 1. DEFAULT DATA & STORAGE INITIALIZATION
// ==========================================

const DEFAULT_STATE = {
  currentRole: 'patient', // 'patient' | 'admin'
  patientTab: 'home',     // 'home', 'recovery', 'activities', 'sos', 'ai', 'rewards', 'friends', 'progress', 'session', 'profile', 'goals', 'craving-journal', 'relapse-plan'
  adminTab: 'overview',   // 'overview', 'patients', 'activities-admin', 'alerts', 'counselling', 'analytics', 'reports', 'settings'
  soundEnabled: true,

  // Patient Profile & Recovery Data
  patient: {
    id: 'RN-8492',
    name: 'Alex Rivera',
    nickname: 'Alex',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    email: 'alex.rivera@renewcare.org',
    phone: '+1 (555) 234-8901',
    recoveryStartDate: '2026-10-12',
    consecutiveSoberDays: 42,
    totalSoberDays: 42,
    points: 1480,
    level: 4,
    levelTitle: 'Mindful Navigator',
    assignedCounsellor: {
      name: 'Dr. Sarah Mitchell, PsyD',
      title: 'Clinical Director & Lead Addiction Specialist',
      clinic: 'HopePath Recovery Centre',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=250&q=80',
      phone: '+1 (555) 789-0123',
      nextAppointment: 'Tomorrow at 10:30 AM',
      type: 'Video Consultation (Telehealth)'
    },
    emergencyContact: {
      name: 'Elena Rivera (Sister)',
      relation: 'Sister / Primary Supporter',
      phone: '+1 (555) 432-1098'
    },
    todayMood: 'Good', // 'Great', 'Good', 'Neutral', 'Struggling', 'Anxious'
    dailyQuote: {
      text: "Recovery is not about perfection. It is about choosing to show up for your future self, one breath, one step, and one choice at a time.",
      author: "Dr. Gabor Maté"
    },
    waterGlasses: 6,
    waterTarget: 8,
    sleepHours: 7.5,
    sleepQuality: 'Refreshed',
    gratitudeNotes: [
      "Grateful for morning sunlight through the window",
      "Grateful my sister called to check in with love",
      "Grateful for 42 mornings waking up with a clear mind"
    ],
    // 12 Required Activities
    activities: [
      { id: 'act-1', title: 'Morning Walking', category: 'body', minutes: 30, points: 30, completed: true, counselorAssigned: true, desc: 'Brisk 30 min morning walk in nature' },
      { id: 'act-2', title: 'Yoga & Gentle Stretching', category: 'body', minutes: 20, points: 25, completed: true, counselorAssigned: true, desc: 'Release somatic muscle tension' },
      { id: 'act-3', title: 'Breathing Exercises', category: 'mind', minutes: 5, points: 20, completed: true, counselorAssigned: true, desc: 'Box breathing to stabilize vagus nerve' },
      { id: 'act-4', title: 'Guided Meditation', category: 'mind', minutes: 15, points: 25, completed: true, counselorAssigned: false, desc: 'Body scan and grounding meditation' },
      { id: 'act-5', title: 'Recovery Reading', category: 'growth', minutes: 20, points: 20, completed: false, counselorAssigned: true, desc: 'Read chapter from Hope & Healing' },
      { id: 'act-6', title: 'Gratitude Journaling', category: 'mind', minutes: 10, points: 25, completed: false, counselorAssigned: true, desc: 'Log 3 specific moments of appreciation' },
      { id: 'act-7', title: 'Healthy Food Tracking', category: 'body', minutes: 5, points: 20, completed: false, counselorAssigned: false, desc: 'Log 3 balanced meals & nutrient density' },
      { id: 'act-8', title: 'Drinking-Water Hydration', category: 'body', minutes: 1, points: 20, completed: true, counselorAssigned: true, desc: 'Reach target of 8 glasses daily' },
      { id: 'act-9', title: 'Sleep Tracking & Rest', category: 'body', minutes: 5, points: 25, completed: true, counselorAssigned: true, desc: 'Maintain 7-8 hours restful sleep' },
      { id: 'act-10', title: 'Family Interaction', category: 'social', minutes: 20, points: 30, completed: false, counselorAssigned: true, desc: 'Positive conversation with approved family' },
      { id: 'act-11', title: 'Creative Activities', category: 'mind', minutes: 25, points: 25, completed: true, counselorAssigned: false, desc: 'Sketching, guitar practice, or journaling' },
      { id: 'act-12', title: 'Learning New Skills', category: 'growth', minutes: 20, points: 20, completed: false, counselorAssigned: false, desc: 'Language practice or digital design study' }
    ],
    // Milestone targets
    milestones: [
      { id: 'm-7', days: 7, title: 'Seedling of Hope', unlocked: true, unlockedDate: 'Oct 19, 2026', badge: '🌱' },
      { id: 'm-14', days: 14, title: 'Rooted Strength', unlocked: true, unlockedDate: 'Oct 26, 2026', badge: '🌿' },
      { id: 'm-30', days: 30, title: 'Blooming Resilience', unlocked: true, unlockedDate: 'Nov 11, 2026', badge: '🌸' },
      { id: 'm-60', days: 60, title: 'Iron Pillar', unlocked: false, daysLeft: 18, badge: '🛡️' },
      { id: 'm-90', days: 90, title: 'Golden Dawn', unlocked: false, daysLeft: 48, badge: '🌅' },
      { id: 'm-180', days: 180, title: 'Diamond Horizon', unlocked: false, daysLeft: 138, badge: '💎' },
      { id: 'm-365', days: 365, title: 'Phoenix Ascendant', unlocked: false, daysLeft: 323, badge: '🦅' }
    ],
    // Badges & Gamification
    badges: [
      { id: 'b-bronze', name: 'Bronze Sober Shield', tier: 'Bronze', icon: '🛡️', earned: true, desc: 'Completed first 7 days sober' },
      { id: 'b-silver', name: 'Silver Mindful Ring', tier: 'Silver', icon: '🧘', earned: true, desc: 'Maintained 14 consecutive daily meditations' },
      { id: 'b-gold', name: 'Gold Resilience Crown', tier: 'Gold', icon: '👑', earned: true, desc: 'Achieved 30 sober days & 1,000 reward points' },
      { id: 'b-diamond', name: 'Diamond Urge Master', tier: 'Diamond', icon: '💎', earned: false, desc: 'Conquer 10 Craving SOS sessions safely' },
      { id: 'b-hydra', name: 'Hydration Hero', tier: 'Silver', icon: '💧', earned: true, desc: 'Logged 8 glasses of water for 7 straight days' },
      { id: 'b-zen', name: 'Gratitude Guru', tier: 'Gold', icon: '✨', earned: true, desc: 'Recorded 30 gratitude moments in your private journal' }
    ],
    // Connected Recovery Buddies (Extra #5)
    buddies: [
      { id: 'b-1', code: 'RN-BUDDY-4102', name: 'Liam C.', streak: 68, status: 'Online & Supporting', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', lastCheer: '2 hours ago' },
      { id: 'b-2', code: 'RN-BUDDY-8921', name: 'Maya P.', streak: 35, status: 'Active 15m ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', lastCheer: 'Yesterday' },
      { id: 'b-3', code: 'RN-BUDDY-1153', name: 'Jordan D.', streak: 92, status: 'Milestone Day!', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', lastCheer: '3 days ago' }
    ],
    // Craving Pattern Journal (Extra #2)
    cravingJournal: [
      { id: 'cj-1', date: 'Nov 21, 2026 - 8:45 PM', trigger: 'Work Stress & Fatigue', intensity: 7, coping: 'Box Breathing + Cold Water Splash', relieved: true, notes: 'Felt an urge after late work email. Used SOS breathing, called Liam, urge passed in 14 minutes.' },
      { id: 'cj-2', date: 'Nov 17, 2026 - 6:30 PM', trigger: 'Social Pressure at Dinner', intensity: 8, coping: 'Craving SOS Grounding + Walked Out', relieved: true, notes: 'Friends ordered drinks. Excused myself to patio, did 5-4-3-2-1 grounding, drank sparkling lime water.' },
      { id: 'cj-3', date: 'Nov 10, 2026 - 10:15 PM', trigger: 'Late Night Boredom / Loneliness', intensity: 6, coping: 'AI Companion Guidance + Journaling', relieved: true, notes: 'Chatted with AI companion about urge surfing. Did 15 min gratitude journaling and slept peacefully.' }
    ],
    // Positive Future Goals (Extra #6)
    futureGoals: [
      { id: 'fg-1', title: 'Run the City 10K Marathon', category: 'Physical Health', targetDate: 'March 2027', progress: 45, notes: 'Running 5km twice weekly without shortness of breath.' },
      { id: 'fg-2', title: 'Complete Digital Design Certification', category: 'Career & Growth', targetDate: 'January 2027', progress: 60, notes: 'Finished Module 3. Designing clean app mockups.' },
      { id: 'fg-3', title: 'Rebuild Relationship with Sister Elena', category: 'Family & Bonds', targetDate: 'Ongoing', progress: 80, notes: 'Weekly dinner scheduled every Sunday. Mutual trust returning.' }
    ],
    // Family Support Care Notes (Extra #7)
    familyNotes: [
      { id: 'fn-1', from: 'Elena Rivera (Sister)', date: 'Today, 9:15 AM', message: "Alex, I saw you hit day 42. Words cannot express how proud I am of you. You are reclaiming your sparkle. Love you always!" },
      { id: 'fn-2', from: 'Carlos Rivera (Dad)', date: 'Nov 18, 2026', message: "Thinking of you son. Every time I see you, you look healthier and clearer. Keep taking it one day at a time." }
    ],
    // Relapse Support Plan (Extra #10)
    relapsePlan: {
      personalTriggers: ['Chronic sleep deprivation', 'Concealing feelings of shame', 'Attending high-risk bars without a buddy', 'Unmanaged professional burnout'],
      warningSigns: ['Skipping morning walking & meditation', 'Isolating from Elena and friends', 'Entertaining euphoric recall memories', 'Cynical mindset'],
      fiveMinuteSteps: [
        '1. Step away immediately from the environment. Go into a neutral, quiet room or outdoors.',
        '2. Splash ice-cold water on your face to trigger the mammalian dive reflex.',
        '3. Tap the Craving SOS button or call Dr. Sarah Mitchell (+1 555-789-0123).',
        '4. Say out loud: "This intense urge is just a neurotransmitter spike. It will crest and fade in 15 minutes."'
      ],
      trustedContacts: [
        { name: 'Dr. Sarah Mitchell (Counsellor)', phone: '+1 (555) 789-0123' },
        { name: 'Liam Chen (Recovery Buddy)', phone: '+1 (555) 345-6789' },
        { name: 'Elena Rivera (Sister)', phone: '+1 (555) 432-1098' },
        { name: 'SAMHSA 24/7 National Helpline', phone: '1-800-662-4357' }
      ]
    },
    // Rehabilitation Session Tracker
    sessionTracker: {
      programmeName: 'HopePath 90-Day Intensive Outpatient Recovery (IOP)',
      centreName: 'HopePath Recovery Centre - Metro Campus',
      startDate: '2026-10-12',
      expectedCompletionDate: '2027-01-10',
      totalProgrammeDays: 90,
      daysCompleted: 42,
      daysRemaining: 48,
      milestonesCompleted: [
        { name: 'Intake Assessment & Detox Stabilization', status: 'Completed', date: 'Oct 14, 2026' },
        { name: 'Phase 1: Emotional Regulation & Somatic Grounding', status: 'Completed', date: 'Nov 02, 2026' },
        { name: 'Phase 2: Cognitive Restructuring & Urge Surfing', status: 'In Progress', date: 'Current' },
        { name: 'Phase 3: Relapse Prevention & Long-Term Integration', status: 'Upcoming', date: 'Dec 15, 2026' }
      ],
      upcomingAppointments: [
        { id: 'app-1', counsellor: 'Dr. Sarah Mitchell', type: '1-on-1 Cognitive Therapy', date: 'Tomorrow, Nov 24', time: '10:30 AM', location: 'Telehealth Video Suite' },
        { id: 'app-2', counsellor: 'Marcus Vance, LCSW', type: 'Alumni Peer Group Circle', date: 'Thursday, Nov 26', time: '6:00 PM', location: 'Room 204 - Metro Campus' },
        { id: 'app-3', counsellor: 'Elena Rostova, RDN', type: 'Nutritional Neuro-Recovery', date: 'Next Tuesday, Dec 01', time: '2:00 PM', location: 'Wellness Wing' }
      ]
    },
    // Smart Notifications (Extra #8)
    notifications: [
      { id: 'notif-1', title: 'Hydration Check-in', desc: 'You are 2 glasses away from today’s goal of 8. Drink some refreshing water!', time: '10 min ago', unread: true },
      { id: 'notif-2', title: 'Appointment Tomorrow', desc: 'Clinical video session with Dr. Mitchell is confirmed for tomorrow at 10:30 AM.', time: '1 hour ago', unread: true },
      { id: 'notif-3', title: 'Streak Celebration!', desc: 'Day 42 reached! You’ve unlocked 30 bonus reward points for consistency.', time: '8 hours ago', unread: false }
    ],
    // AI Chat History
    chatHistory: [
      { role: 'assistant', text: "Hello Alex. Welcome to your safe space. I'm your RENEW AI Recovery Companion. How are your mind and body feeling right now on Day 42?" }
    ]
  },

  // Clinical Admin & Counsellor Data
  admin: {
    counsellorName: 'Dr. Sarah Mitchell, PsyD',
    role: 'Clinical Director & Lead Addiction Specialist',
    centreName: 'HopePath Addiction & Wellness Institute',
    stats: {
      totalRegistered: 128,
      activePatients: 114,
      dailyActivityRate: 84.6,
      patientsRequiringFollowUp: 7,
      pendingAppointments: 12,
      cravingAlertsReview: 3
    },
    // Patient Directory
    patients: [
      { id: 'RN-8492', name: 'Alex Rivera', substance: 'Alcohol & Stimulants', streak: 42, adherence: 88, counsellor: 'Dr. Sarah Mitchell', status: 'Active', programmeDays: 90, daysLeft: 48, lastCheckIn: 'Today, 8:40 AM' },
      { id: 'RN-7301', name: 'David Miller', substance: 'Alcohol Use Recovery', streak: 19, adherence: 65, counsellor: 'Dr. Marcus Vance', status: 'Needs Follow-up', programmeDays: 60, daysLeft: 41, lastCheckIn: 'Yesterday, 3:10 PM' },
      { id: 'RN-9124', name: 'Sophia Chen', substance: 'Opioid Recovery (MAT)', streak: 85, adherence: 96, counsellor: 'Dr. Sarah Mitchell', status: 'Active', programmeDays: 180, daysLeft: 95, lastCheckIn: 'Today, 9:15 AM' },
      { id: 'RN-5510', name: 'James Thornton', substance: 'Alcohol & Benzodiazepines', streak: 9, adherence: 52, counsellor: 'Elena Rostova', status: 'Needs Follow-up', programmeDays: 90, daysLeft: 81, lastCheckIn: '2 days ago' },
      { id: 'RN-6029', name: 'Rachel Adams', substance: 'Cannabis & Polysubstance', streak: 31, adherence: 91, counsellor: 'Dr. Marcus Vance', status: 'Active', programmeDays: 60, daysLeft: 29, lastCheckIn: 'Today, 7:50 AM' },
      { id: 'RN-4408', name: 'Carlos Mendez', substance: 'Alcohol Recovery', streak: 60, adherence: 94, counsellor: 'Dr. Sarah Mitchell', status: 'Active', programmeDays: 90, daysLeft: 30, lastCheckIn: 'Today, 10:05 AM' },
      { id: 'RN-3882', name: 'Emily Watson', substance: 'Stimulant Recovery', streak: 4, adherence: 40, counsellor: 'Elena Rostova', status: 'Needs Follow-up', programmeDays: 90, daysLeft: 86, lastCheckIn: 'Yesterday, 9:00 PM' },
      { id: 'RN-1920', name: 'Robert King', substance: 'Dual Diagnosis (PTSD/Alcohol)', streak: 112, adherence: 98, counsellor: 'Dr. Marcus Vance', status: 'Active', programmeDays: 180, daysLeft: 68, lastCheckIn: 'Today, 8:00 AM' }
    ],
    // Urgent Craving SOS Alerts Queue
    cravingAlerts: [
      { id: 'sos-101', patientId: 'RN-8492', patientName: 'Alex Rivera', timestamp: '15 mins ago', intensity: 7, trigger: 'High Work Stress', coping: 'Box Breathing + Cold Water', status: 'In Progress', notes: 'Patient checked in via SOS, used breathing tool. Follow-up video call scheduled for tomorrow.' },
      { id: 'sos-102', patientId: 'RN-5510', patientName: 'James Thornton', timestamp: '1 hour ago', intensity: 9, trigger: 'Social Trigger / Bar Environment', coping: 'Urgent Contact Tap', status: 'Pending', notes: 'High intensity urge reported. Peer buddy contacted. On-call nurse notified.' },
      { id: 'sos-103', patientId: 'RN-7301', patientName: 'David Miller', timestamp: '3 hours ago', intensity: 6, trigger: 'Fatigue & Isolation', coping: 'Grounding 5-4-3-2-1', status: 'Resolved', notes: 'Completed grounding exercises and reported craving subsided. Case manager reviewed.' }
    ],
    // Clinical Counselling Schedule
    counsellingSchedule: [
      { id: 'cs-1', patientName: 'Alex Rivera (RN-8492)', type: 'Individual CBT Session', time: 'Tomorrow, 10:30 AM', room: 'Telehealth Room A', status: 'Confirmed' },
      { id: 'cs-2', patientName: 'Sophia Chen (RN-9124)', type: 'Milestone 90-Day Review', time: 'Tomorrow, 1:00 PM', room: 'Consult Room 102', status: 'Confirmed' },
      { id: 'cs-3', patientName: 'James Thornton (RN-5510)', type: 'Urgent Stabilization Check-in', time: 'Tomorrow, 3:30 PM', room: 'Telehealth Room B', status: 'Pending Review' }
    ]
  }
};

// LocalStorage Manager
class Store {
  constructor() {
    this.key = 'renew_recovery_platform_v2';
    this.state = this.load();
  }

  load() {
    try {
      const data = localStorage.getItem(this.key);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to parse state from localStorage, using default.', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  save() {
    try {
      localStorage.setItem(this.key, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }

  reset() {
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.save();
    renderApp();
    showToast('Platform reset to realistic prototype demonstration data.', 'success');
  }
}

const store = new Store();

// ==========================================
// 2. AUDIO SYNTHESIZER (WEB AUDIO API)
// Provides gentle meditation bells & chimes
// ==========================================
class AudioCue {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playChime(freq = 440, duration = 1.8, type = 'sine') {
    if (!store.state.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.98, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio not permitted or supported in this context
    }
  }

  playSuccess() {
    this.playChime(523.25, 0.4); // C5
    setTimeout(() => this.playChime(659.25, 0.5), 150); // E5
    setTimeout(() => this.playChime(783.99, 1.2), 300); // G5
  }

  playBreathInhale() {
    this.playChime(392.00, 2.5); // G4 soft
  }

  playBreathExhale() {
    this.playChime(329.63, 2.8); // E4 soothing
  }
}

const soundManager = new AudioCue();

// ==========================================
// 3. TOAST & NOTIFICATION ENGINE
// ==========================================
function showToast(message, type = 'teal', title = '') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let iconSvg = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-teal-600">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>`;

  if (type === 'danger') {
    iconSvg = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>`;
  } else if (type === 'warning') {
    iconSvg = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>`;
  }

  toast.innerHTML = `
    <div>${iconSvg}</div>
    <div class="flex-1">
      ${title ? `<h4 class="text-sm font-bold text-slate-800 mb-0.5">${title}</h4>` : ''}
      <p class="text-xs text-slate-600 leading-snug">${message}</p>
    </div>
    <button class="text-slate-400 hover:text-slate-600 text-lg leading-none p-1" onclick="this.parentElement.remove()">✕</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px) scale(0.95)';
    setTimeout(() => toast.remove(), 300);
  }, 4200);
}

// Confetti Engine
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#0d9488', '#14b8a6', '#2dd4bf', '#f59e0b', '#3b82f6', '#10b981', '#ec4899'];

  for (let i = 0; i < 90; i++) {
    pieces.push({
      x: canvas.width / 2 + (Math.random() * 200 - 100),
      y: canvas.height * 0.4,
      r: Math.random() * 7 + 4,
      d: Math.random() * 40,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 12,
      vy: -Math.random() * 12 - 4,
      tilt: Math.random() * 10 - 10,
      tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
      tiltAngle: 0
    });
  }

  let animationId;
  let frames = 0;

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frames++;

    pieces.forEach(p => {
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
      p.x += Math.sin(p.d);
      p.tilt = Math.sin(p.tiltAngle) * 15;

      ctx.beginPath();
      ctx.lineWidth = p.r;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
      ctx.stroke();
    });

    if (frames < 140) {
      animationId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationId);
    }
  }

  render();
}

// ==========================================
// 4. ACTION HANDLERS & CORE MUTATIONS
// ==========================================

window.setRole = function(role) {
  store.state.currentRole = role;
  store.save();
  renderApp();
  const roleName = role === 'admin' ? 'Rehab Centre / Counsellor Portal' : 'Patient Portal';
  showToast(`Switched view to ${roleName}`, 'teal', 'Role-Based Access');
};

window.setPatientTab = function(tab) {
  store.state.patientTab = tab;
  store.save();
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.setAdminTab = function(tab) {
  store.state.adminTab = tab;
  store.save();
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.toggleSound = function() {
  store.state.soundEnabled = !store.state.soundEnabled;
  store.save();
  renderApp();
  showToast(store.state.soundEnabled ? 'Calming audio cues enabled.' : 'Audio cues muted.', 'teal');
};

// Activity completion toggle
window.toggleActivity = function(actId) {
  const act = store.state.patient.activities.find(a => a.id === actId);
  if (!act) return;

  act.completed = !act.completed;

  if (act.completed) {
    store.state.patient.points += act.points;
    soundManager.playSuccess();
    showToast(`+${act.points} Points earned for "${act.title}"!`, 'success', 'Daily Activity Completed');

    // Check if all activities completed
    const completedCount = store.state.patient.activities.filter(a => a.completed).length;
    if (completedCount === store.state.patient.activities.length) {
      triggerConfetti();
      showToast('Incredible dedication! You completed all daily recovery tasks today!', 'success', '🌟 Daily Goal Reached');
    }
  } else {
    store.state.patient.points = Math.max(0, store.state.patient.points - act.points);
  }

  // Update level progress
  updatePatientLevel();
  store.save();
  renderApp();
};

function updatePatientLevel() {
  const pts = store.state.patient.points;
  let level = 1;
  let title = 'Seedling Starter';

  if (pts >= 2500) { level = 5; title = 'Beacon of Hope'; }
  else if (pts >= 1400) { level = 4; title = 'Mindful Navigator'; }
  else if (pts >= 800) { level = 3; title = 'Resilient Climber'; }
  else if (pts >= 350) { level = 2; title = 'Rooted Seeker'; }

  store.state.patient.level = level;
  store.state.patient.levelTitle = title;
}

// Water tracker
window.addWaterGlass = function() {
  if (store.state.patient.waterGlasses < 12) {
    store.state.patient.waterGlasses++;
    soundManager.playChime(600, 0.3);
    if (store.state.patient.waterGlasses === store.state.patient.waterTarget) {
      store.state.patient.points += 20;
      showToast('Hydration Goal Reached! +20 Reward Points.', 'success');
      triggerConfetti();
    }
    store.save();
    renderApp();
  }
};

window.removeWaterGlass = function() {
  if (store.state.patient.waterGlasses > 0) {
    store.state.patient.waterGlasses--;
    store.save();
    renderApp();
  }
};

// Mood check-in
window.setMood = function(mood) {
  store.state.patient.todayMood = mood;
  soundManager.playChime(500, 0.4);
  store.save();
  renderApp();
  showToast(`Mood check-in recorded: ${mood}. Thank you for honoring your feelings.`, 'teal', 'Daily Emotional Check-in');
};

// Add Gratitude note
window.submitGratitude = function(e) {
  e.preventDefault();
  const input = document.getElementById('gratitude-input');
  if (!input || !input.value.trim()) return;

  store.state.patient.gratitudeNotes.unshift(input.value.trim());
  store.state.patient.points += 15;
  soundManager.playSuccess();
  showToast('Gratitude recorded in your private recovery log (+15 pts).', 'success');
  input.value = '';
  store.save();
  renderApp();
};

// Add positive future goal (Extra #6)
window.addFutureGoal = function(e) {
  e.preventDefault();
  const title = document.getElementById('goal-title')?.value.trim();
  const category = document.getElementById('goal-cat')?.value;
  const date = document.getElementById('goal-date')?.value;
  if (!title) return;

  store.state.patient.futureGoals.push({
    id: 'fg-' + Date.now(),
    title,
    category: category || 'Personal Growth',
    targetDate: date || 'Spring 2027',
    progress: 10,
    notes: 'Created today with optimism.'
  });

  store.state.patient.points += 25;
  showToast('New positive future goal established (+25 pts)!', 'success');
  store.save();
  renderApp();
};

// Send cheer to Recovery Buddy (Extra #5)
window.sendBuddyCheer = function(buddyId) {
  const buddy = store.state.patient.buddies.find(b => b.id === buddyId);
  if (!buddy) return;
  buddy.lastCheer = 'Just now';
  soundManager.playSuccess();
  showToast(`Encouraging cheer sent to ${buddy.name}! "Proud of you, stay strong today!"`, 'teal', 'Buddy Connection');
  store.save();
  renderApp();
};

// Connect new buddy by invitation code
window.addBuddyByCode = function(e) {
  e.preventDefault();
  const input = document.getElementById('buddy-code-input');
  if (!input || !input.value.trim()) return;
  const code = input.value.trim().toUpperCase();

  const newBuddy = {
    id: 'b-' + Date.now(),
    code: code,
    name: 'Peer Supporter (' + code.substring(0, 8) + ')',
    streak: Math.floor(Math.random() * 45) + 12,
    status: 'Connected & Cheering',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    lastCheer: 'Just connected'
  };

  store.state.patient.buddies.push(newBuddy);
  soundManager.playSuccess();
  showToast(`Connected with buddy ${code}! Sobriety history remains strictly private.`, 'success');
  input.value = '';
  store.save();
  renderApp();
};

// Request Private Counsellor Follow-up (Extra #9)
window.requestCounsellorFollowup = function() {
  const modal = document.getElementById('counsellor-modal');
  if (modal) modal.classList.remove('hidden');
};

window.closeCounsellorModal = function() {
  const modal = document.getElementById('counsellor-modal');
  if (modal) modal.classList.add('hidden');
};

window.submitCounsellorRequest = function(e) {
  e.preventDefault();
  const reason = document.getElementById('counsel-reason')?.value;
  const urgency = document.getElementById('counsel-urgency')?.value;

  // Add notification to admin queue
  store.state.admin.cravingAlerts.unshift({
    id: 'req-' + Date.now(),
    patientId: store.state.patient.id,
    patientName: store.state.patient.name,
    timestamp: 'Just now',
    intensity: urgency === 'Urgent' ? 8 : 4,
    trigger: 'Patient Requested Follow-up: ' + reason,
    coping: 'Direct Appointment Request',
    status: 'Pending',
    notes: 'Requested private session regarding ' + reason
  });

  store.state.admin.stats.patientsRequiringFollowUp++;
  store.save();
  window.closeCounsellorModal();
  showToast('Follow-up request dispatched to Dr. Sarah Mitchell. Her clinical team will confirm shortly.', 'teal', 'Clinical Appointment Request');
};

// Supportive Reset Process (Shame-Free Sobriety Reset)
window.openResetModal = function() {
  const modal = document.getElementById('reset-modal');
  if (modal) modal.classList.remove('hidden');
};

window.closeResetModal = function() {
  const modal = document.getElementById('reset-modal');
  if (modal) modal.classList.add('hidden');
};

window.confirmSupportiveReset = function(e) {
  e.preventDefault();
  const notes = document.getElementById('reset-notes')?.value || 'Self-reported honest check-in';

  // Save the setback compassionately in journal
  store.state.patient.cravingJournal.unshift({
    id: 'cj-' + Date.now(),
    date: 'Today (Courageous Reset)',
    trigger: 'Setback Honest Reflection',
    intensity: 8,
    coping: 'Compassionate Reset Plan Activated',
    relieved: true,
    notes: 'Honest reset recorded with courage: "' + notes + '". Zero shame, 42 days of prior healing preserved.'
  });

  // Reset consecutive counter, keep total days high to honor effort
  store.state.patient.consecutiveSoberDays = 0;
  store.save();
  window.closeResetModal();
  renderApp();

  showToast('Your courage to be honest is your superpower. Your neural healing is not undone. We stand with you today.', 'teal', '🌿 Courageous New Beginning');
};

// ==========================================
// 5. CRAVING SOS INTERACTIVE SYSTEM
// Priority Emergency Feature
// ==========================================

let sosBreathingInterval = null;
let sosTimerSeconds = 16;
let currentBreathPhase = 'Inhale'; // 'Inhale', 'Hold', 'Exhale', 'Rest'

window.openSOS = function() {
  soundManager.playBreathInhale();
  store.state.patientTab = 'sos';
  store.save();
  renderApp();
  startSOSBreathing();
};

window.exitSOS = function() {
  stopSOSBreathing();
  store.state.patientTab = 'home';
  store.save();
  renderApp();
};

function startSOSBreathing() {
  stopSOSBreathing();
  let phaseIndex = 0;
  const phases = [
    { name: 'Inhale through nose', duration: 4, action: 'inhale' },
    { name: 'Gently hold breath', duration: 4, action: 'hold' },
    { name: 'Slowly exhale through mouth', duration: 4, action: 'exhale' },
    { name: 'Rest and pause', duration: 4, action: 'rest' }
  ];

  let remainingInPhase = 4;

  const updateDisplay = () => {
    const phaseEl = document.getElementById('sos-phase-text');
    const timerEl = document.getElementById('sos-timer-count');
    const orbEl = document.getElementById('sos-orb');

    if (phaseEl && timerEl && orbEl) {
      phaseEl.textContent = phases[phaseIndex].name;
      timerEl.textContent = remainingInPhase + 's';

      if (phases[phaseIndex].action === 'inhale') {
        orbEl.style.transform = 'scale(1.35)';
        orbEl.style.boxShadow = '0 0 70px rgba(45, 212, 191, 0.7)';
      } else if (phases[phaseIndex].action === 'exhale') {
        orbEl.style.transform = 'scale(0.85)';
        orbEl.style.boxShadow = '0 0 25px rgba(13, 148, 136, 0.3)';
      }
    }
  };

  sosBreathingInterval = setInterval(() => {
    remainingInPhase--;
    if (remainingInPhase <= 0) {
      phaseIndex = (phaseIndex + 1) % phases.length;
      remainingInPhase = phases[phaseIndex].duration;

      if (phases[phaseIndex].action === 'inhale') soundManager.playBreathInhale();
      if (phases[phaseIndex].action === 'exhale') soundManager.playBreathExhale();
    }
    updateDisplay();
  }, 1000);
}

function stopSOSBreathing() {
  if (sosBreathingInterval) {
    clearInterval(sosBreathingInterval);
    sosBreathingInterval = null;
  }
}

// Log SOS outcome
window.recordSOSOutcome = function(reliefLevel) {
  const trigger = document.getElementById('sos-trigger-select')?.value || 'Spontaneous Craving';
  const notes = document.getElementById('sos-reflection-notes')?.value || 'Completed SOS protocol.';

  // Add to patient craving journal
  store.state.patient.cravingJournal.unshift({
    id: 'cj-' + Date.now(),
    date: 'Just now (SOS Session)',
    trigger: trigger,
    intensity: reliefLevel === 'Much Better' ? 3 : 6,
    coping: 'SOS 5-Step Protocol & Guided Breathing',
    relieved: reliefLevel !== 'Still Intense',
    notes: `Outcome: ${reliefLevel}. Notes: ${notes}`
  });

  // Award reward points for utilizing emergency tool
  store.state.patient.points += 40;
  updatePatientLevel();

  // Create an alert in Admin Portal for clinician monitoring
  store.state.admin.cravingAlerts.unshift({
    id: 'sos-' + Date.now(),
    patientId: store.state.patient.id,
    patientName: store.state.patient.name,
    timestamp: 'Just now',
    intensity: reliefLevel === 'Still Intense' ? 9 : 5,
    trigger: trigger,
    coping: 'Craving SOS Completed (' + reliefLevel + ')',
    status: reliefLevel === 'Still Intense' ? 'Pending' : 'Resolved',
    notes: `Patient engaged SOS protocol. Relief level: ${reliefLevel}. ${notes}`
  });

  store.save();
  stopSOSBreathing();
  soundManager.playSuccess();
  showToast(`SOS Session completed! +40 Reward Points. Proud of your resilience.`, 'success', 'Urge Conquered');
  window.setPatientTab('home');
};

// Immediate Clinician Alert from SOS
window.triggerSOSClinicianCall = function() {
  store.state.admin.cravingAlerts.unshift({
    id: 'urgent-' + Date.now(),
    patientId: store.state.patient.id,
    patientName: store.state.patient.name,
    timestamp: 'RIGHT NOW',
    intensity: 10,
    trigger: 'Emergency SOS Clinician Contact Requested',
    coping: 'One-Tap Emergency Alert',
    status: 'Pending',
    notes: 'PATIENT IN HIGH DISTRESS: One-tap clinician button activated. Urgent outreach required.'
  });
  store.state.admin.stats.cravingAlertsReview++;
  store.save();
  soundManager.playChime(350, 1.2, 'triangle');
  showToast('Emergency ping dispatched to Dr. Sarah Mitchell’s on-call clinical desk. If in immediate danger, please dial 911 or 988.', 'danger', 'Clinician Notified');
};

// Distraction Puzzle: Word Unscramble
const SOS_PUZZLES = [
  { scrambled: 'E C E A P', word: 'PEACE', hint: 'A quiet, serene state of mind' },
  { scrambled: 'E R E S N T I Y', word: 'SERENITY', hint: 'The famous recovery prayer' },
  { scrambled: 'E C A R U G O', word: 'COURAGE', hint: 'Facing challenges with heart' },
  { scrambled: 'E B A T R H E', word: 'BREATHE', hint: 'Inhale gently, exhale slowly' }
];
let currentPuzzleIndex = 0;

window.checkPuzzle = function() {
  const input = document.getElementById('puzzle-answer');
  const result = document.getElementById('puzzle-result');
  if (!input || !result) return;

  const guess = input.value.trim().toUpperCase();
  const current = SOS_PUZZLES[currentPuzzleIndex];

  if (guess === current.word) {
    result.innerHTML = `<span class="text-emerald-400 font-bold">✓ Beautifully solved! Focus shifts, cravings dissolve.</span>`;
    soundManager.playSuccess();
    setTimeout(() => {
      currentPuzzleIndex = (currentPuzzleIndex + 1) % SOS_PUZZLES.length;
      renderApp();
    }, 1200);
  } else {
    result.innerHTML = `<span class="text-rose-400 font-medium">Keep trying! Hint: ${current.hint}</span>`;
  }
};

// ==========================================
// 6. AI RECOVERY COMPANION ENGINE
// Safe, supportive, empathetic CBT conversational agent
// ==========================================

const AI_KNOWLEDGE_BASE = [
  {
    triggers: ['urge', 'craving', 'drink', 'relapse', 'slip', 'smoke', 'pill'],
    response: "I hear how loud that urge feels right now. Remember: a craving is like an ocean wave. It rises, peaks over 10 to 15 minutes, and then naturally breaks and subsides. You do not have to fight it; you can 'surf' it with your breath. Let's take three slow breaths together. Would you like to try the 5-4-3-2-1 grounding exercise or call your buddy Liam Chen?"
  },
  {
    triggers: ['stress', 'anxious', 'anxiety', 'overwhelmed', 'burnout', 'work'],
    response: "Stress is one of the most common recovery triggers because our old neuropathways associate tension with quick chemical numbing. Today, let's honor what your nervous system is actually asking for: true decompression. Can you step away from screens for 5 minutes, drink a tall glass of cold water, or do our 5-minute somatic shoulder release?"
  },
  {
    triggers: ['lonely', 'alone', 'bored', 'empty', 'sad', 'isolated'],
    response: "Addiction thrives in isolation, but healing happens in connection. Feeling lonely is not a defect—it is your human spirit signaling a need for community. Your recovery buddy Liam Chen is online right now, and Elena sent you a loving note this morning. Would you like to send a quick cheer to Liam or write 3 things you're grateful for?"
  },
  {
    triggers: ['reset', 'setback', 'guilt', 'shame', 'failed', 'mess'],
    response: "Take a deep breath and place a hand on your heart. One moment does not erase the 42 days of neural rewiring, cellular detox, and inner resilience you have built. In our RENEW framework, a setback is data, not defeat. What was happening right before the urge? Let's look at it with compassionate curiosity, not judgment."
  },
  {
    triggers: ['hello', 'hi', 'hey', 'help', 'good morning', 'start'],
    response: "Warm welcome, Alex! I am right here with you on Day 42. You've completed 4 daily recovery activities already today. What would support your peace of mind the most right now: a motivational quote, a quick breathing pause, or exploring a coping strategy?"
  }
];

window.sendAIMessage = function(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('ai-chat-input');
  if (!input || !input.value.trim()) return;

  const userText = input.value.trim();
  input.value = '';

  // Append user message
  store.state.patient.chatHistory.push({ role: 'user', text: userText });
  renderApp();

  // Scroll to bottom
  const box = document.getElementById('ai-chat-box');
  if (box) box.scrollTop = box.scrollHeight;

  // Simulate empathetic AI thinking
  setTimeout(() => {
    let reply = "You are doing brave work taking your life back one day at a time. Every moment you pause and choose awareness over impulse, you strengthen your healthy brain circuits. I'm here to support you. Would you like to review your Relapse Prevention Plan or try a grounding exercise?";

    const lower = userText.toLowerCase();
    for (const item of AI_KNOWLEDGE_BASE) {
      if (item.triggers.some(t => lower.includes(t))) {
        reply = item.response;
        break;
      }
    }

    store.state.patient.chatHistory.push({ role: 'assistant', text: reply });
    soundManager.playChime(580, 0.3);
    store.save();
    renderApp();

    const boxAfter = document.getElementById('ai-chat-box');
    if (boxAfter) boxAfter.scrollTop = boxAfter.scrollHeight;
  }, 650);
};

window.sendAIPrompt = function(text) {
  const input = document.getElementById('ai-chat-input');
  if (input) {
    input.value = text;
    window.sendAIMessage();
  }
};

window.clearAIChat = function() {
  store.state.patient.chatHistory = [
    { role: 'assistant', text: "Chat history cleared. I'm right here with you, Alex. How are you feeling right now on Day 42?" }
  ];
  store.save();
  renderApp();
  showToast('Chat history reset.', 'teal');
};

// ==========================================
// 7. CLINICAL ADMIN PORTAL ACTIONS
// ==========================================

// Register New Patient Modal
window.openRegisterPatientModal = function() {
  const modal = document.getElementById('register-patient-modal');
  if (modal) modal.classList.remove('hidden');
};

window.closeRegisterPatientModal = function() {
  const modal = document.getElementById('register-patient-modal');
  if (modal) modal.classList.add('hidden');
};

window.submitNewPatient = function(e) {
  e.preventDefault();
  const name = document.getElementById('new-patient-name')?.value.trim();
  const substance = document.getElementById('new-patient-substance')?.value.trim();
  const counsellor = document.getElementById('new-patient-counsellor')?.value;
  const duration = parseInt(document.getElementById('new-patient-duration')?.value || '90', 10);

  if (!name) return;

  const newId = 'RN-' + Math.floor(1000 + Math.random() * 9000);

  store.state.admin.patients.unshift({
    id: newId,
    name: name,
    substance: substance || 'Alcohol & Polysubstance',
    streak: 1,
    adherence: 100,
    counsellor: counsellor || 'Dr. Sarah Mitchell',
    status: 'Active',
    programmeDays: duration,
    daysLeft: duration - 1,
    lastCheckIn: 'Registered Today'
  });

  store.state.admin.stats.totalRegistered++;
  store.state.admin.stats.activePatients++;
  store.save();
  window.closeRegisterPatientModal();
  renderApp();
  soundManager.playSuccess();
  showToast(`New patient registered successfully with Unique ID: ${newId}`, 'success', 'Patient Registered');
};

// Update SOS Alert Status
window.updateSOSStatus = function(alertId, newStatus) {
  const alert = store.state.admin.cravingAlerts.find(a => a.id === alertId);
  if (!alert) return;
  alert.status = newStatus;
  store.save();
  renderApp();
  showToast(`SOS incident status updated to: ${newStatus}`, 'teal');
};

// Update Patient Programme Dates / Custom activities
window.openPatientDetailsModal = function(patientId) {
  const patient = store.state.admin.patients.find(p => p.id === patientId);
  if (!patient) return;

  const modal = document.getElementById('patient-detail-modal');
  if (!modal) return;

  document.getElementById('p-detail-id').textContent = patient.id;
  document.getElementById('p-detail-name').textContent = patient.name;
  document.getElementById('p-detail-substance').textContent = patient.substance;
  document.getElementById('p-detail-counsellor').textContent = patient.counsellor;
  document.getElementById('p-detail-streak').textContent = patient.streak + ' Days Sober';
  document.getElementById('p-detail-duration').value = patient.programmeDays;

  modal.classList.remove('hidden');
};

window.closePatientDetailsModal = function() {
  const modal = document.getElementById('patient-detail-modal');
  if (modal) modal.classList.add('hidden');
};

window.savePatientDetailChanges = function() {
  const id = document.getElementById('p-detail-id').textContent;
  const patient = store.state.admin.patients.find(p => p.id === id);
  if (patient) {
    const dur = parseInt(document.getElementById('p-detail-duration').value, 10);
    patient.programmeDays = dur;
    patient.daysLeft = Math.max(0, dur - patient.streak);
    store.save();
    renderApp();
    showToast(`Programme duration updated for ${patient.name}.`, 'success');
  }
  window.closePatientDetailsModal();
};

// ==========================================
// 8. RENDERERS & VIEW ARCHITECTURE
// ==========================================

function renderApp() {
  const root = document.getElementById('app-root');
  if (!root) return;

  const role = store.state.currentRole;

  root.innerHTML = `
    <!-- Top Healthcare Navigation Bar -->
    ${renderTopNav()}

    <!-- Main Workspace Container -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      ${role === 'patient' ? renderPatientPortal() : renderAdminPortal()}
    </main>

    <!-- Global Modals & Drawers -->
    ${renderCounsellorModal()}
    ${renderResetModal()}
    ${renderRegisterPatientModal()}
    ${renderPatientDetailModal()}
    
    <!-- Footer -->
    ${renderFooter()}
  `;
}

// ------------------------------------------
// Navigation Bar
// ------------------------------------------
function renderTopNav() {
  const role = store.state.currentRole;
  const p = store.state.patient;
  const unreadCount = p.notifications.filter(n => n.unread).length;

  return `
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Brand Logo & Tagline -->
          <div class="flex items-center gap-3.5 cursor-pointer" onclick="${role === 'patient' ? "setPatientTab('home')" : "setAdminTab('overview')"}">
            <div class="w-12 h-12 rounded-2xl gradient-teal flex items-center justify-center text-white shadow-teal shadow-md">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-2xl font-black tracking-tight text-slate-900">RENEW</span>
                <span class="text-xs font-semibold px-2 py-0.5 rounded-full ${role === 'patient' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-navy-900 text-indigo-700 bg-indigo-50 border border-indigo-200'}">
                  ${role === 'patient' ? 'Patient Portal' : 'Clinical Admin'}
                </span>
              </div>
              <p class="text-xs text-slate-500 font-medium tracking-wide">Every Day Sober. Every Step Stronger.</p>
            </div>
          </div>

          <!-- Middle Emergency SOS Button (Only in patient view) -->
          <div class="hidden sm:flex items-center gap-3">
            ${role === 'patient' ? `
              <button onclick="openSOS()" class="pulse-emergency flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-rose shadow-md transition-all">
                <span class="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
                <span>Craving SOS</span>
                <span class="text-xs px-1.5 py-0.5 rounded bg-white/20 font-mono">PRIORITY</span>
              </button>
            ` : `
              <div class="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-xs text-slate-600 font-medium">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>HopePath Clinical Server: Online</span>
              </div>
            `}
          </div>

          <!-- Right Controls: Audio, Notifications, Role Switcher -->
          <div class="flex items-center gap-3">
            
            <!-- Audio chime toggle -->
            <button onclick="toggleSound()" title="Toggle calming sound cues" class="p-2.5 rounded-xl text-slate-500 hover:text-teal-600 hover:bg-slate-100 transition-colors">
              ${store.state.soundEnabled ? `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              ` : `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
              `}
            </button>

            <!-- Notifications Bell -->
            <div class="relative">
              <button onclick="showToast('You have 3 notifications in your clinical inbox.', 'teal', 'Smart Reminders')" class="p-2.5 rounded-xl text-slate-500 hover:text-teal-600 hover:bg-slate-100 transition-colors relative">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                ${unreadCount > 0 ? `
                  <span class="absolute top-1.5 right-1.5 w-4 h-4 bg-teal-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    ${unreadCount}
                  </span>
                ` : ''}
              </button>
            </div>

            <!-- Role Switcher Button -->
            <div class="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button onclick="setRole('patient')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${role === 'patient' ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
                Patient View
              </button>
              <button onclick="setRole('admin')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${role === 'admin' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
                Clinician / Admin
              </button>
            </div>

            <!-- Profile Pill -->
            <div class="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200">
              <img src="${role === 'patient' ? p.avatar : store.state.admin.patients[0].counsellor === 'Dr. Sarah Mitchell' ? 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80' : p.avatar}" class="w-9 h-9 rounded-full object-cover border-2 border-teal-500" alt="Avatar">
              <div class="text-left">
                <div class="text-xs font-bold text-slate-800 leading-tight">${role === 'patient' ? p.name : 'Dr. Sarah Mitchell'}</div>
                <div class="text-[11px] text-slate-500 font-mono">${role === 'patient' ? p.id : 'Clinical Director'}</div>
              </div>
            </div>

          </div>

        </div>

        <!-- Navigation Tabs Bar -->
        <nav class="flex items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar text-xs font-semibold border-t border-slate-100">
          ${role === 'patient' ? renderPatientNavLinks() : renderAdminNavLinks()}
        </nav>
      </div>
    </header>
  `;
}

function renderPatientNavLinks() {
  const current = store.state.patientTab;
  const links = [
    { id: 'home', label: 'Home Dashboard', icon: '🏠' },
    { id: 'recovery', label: 'My Recovery & Milestones', icon: '🌱' },
    { id: 'activities', label: 'Daily Activities', icon: '✅' },
    { id: 'sos', label: 'Craving SOS', icon: '🚨', alert: true },
    { id: 'ai', label: 'AI Companion', icon: '🤖' },
    { id: 'rewards', label: 'Rewards & Badges', icon: '🏆' },
    { id: 'friends', label: 'Recovery Buddies', icon: '🤝' },
    { id: 'progress', label: 'My Progress & Analytics', icon: '📈' },
    { id: 'session', label: 'Rehabilitation Session Tracker', icon: '🏥' },
    { id: 'profile', label: 'Profile & Clinical Contacts', icon: '⚙️' }
  ];

  return links.map(l => `
    <button onclick="setPatientTab('${l.id}')" class="whitespace-nowrap flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${current === l.id ? 'bg-teal-600 text-white shadow-sm' : l.alert ? 'bg-rose-50 text-rose-700 hover:bg-rose-100' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}">
      <span>${l.icon}</span>
      <span>${l.label}</span>
    </button>
  `).join('');
}

function renderAdminNavLinks() {
  const current = store.state.adminTab;
  const links = [
    { id: 'overview', label: 'Centre Overview', icon: '📊' },
    { id: 'patients', label: 'Patient Management', icon: '👥' },
    { id: 'activities-admin', label: 'Activity Customization', icon: '📋' },
    { id: 'alerts', label: 'Craving SOS Alerts', icon: '🚨', badge: store.state.admin.stats.cravingAlertsReview },
    { id: 'counselling', label: 'Counselling Appointments', icon: '🗓️' },
    { id: 'analytics', label: 'Clinical Analytics', icon: '📈' },
    { id: 'reports', label: 'Compliance & Reports', icon: '📄' },
    { id: 'settings', label: 'Centre Settings', icon: '⚙️' }
  ];

  return links.map(l => `
    <button onclick="setAdminTab('${l.id}')" class="whitespace-nowrap flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${current === l.id ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}">
      <span>${l.icon}</span>
      <span>${l.label}</span>
      ${l.badge ? `<span class="ml-1 px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">${l.badge}</span>` : ''}
    </button>
  `).join('');
}

// ==========================================
// 9. PATIENT PORTAL PAGES
// ==========================================

function renderPatientPortal() {
  const tab = store.state.patientTab;
  switch (tab) {
    case 'home': return renderPatientHome();
    case 'recovery': return renderMyRecovery();
    case 'activities': return renderDailyActivities();
    case 'sos': return renderCravingSOS();
    case 'ai': return renderAICompanion();
    case 'rewards': return renderRewards();
    case 'friends': return renderFriends();
    case 'progress': return renderMyProgress();
    case 'session': return renderSessionTracker();
    case 'profile': return renderProfile();
    case 'goals': return renderFutureGoalsPage();
    case 'craving-journal': return renderCravingJournalPage();
    case 'relapse-plan': return renderRelapsePlanPage();
    default: return renderPatientHome();
  }
}

// ------------------------------------------
// Patient Page A: Home Dashboard
// ------------------------------------------
function renderPatientHome() {
  const p = store.state.patient;
  const completedActs = p.activities.filter(a => a.completed).length;
  const totalActs = p.activities.length;
  const completionPct = Math.round((completedActs / totalActs) * 100);

  return `
    <div class="space-y-6 animate-fade-in">
      
      <!-- Welcome Hero Card with Motivational Quote -->
      <div class="relative overflow-hidden rounded-3xl gradient-teal text-white p-7 md:p-9 shadow-teal">
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-2 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
              <span>☀️ Good Evening, ${p.nickname}</span>
              <span>•</span>
              <span class="font-mono">Patient ID: ${p.id}</span>
            </div>
            <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Day ${p.consecutiveSoberDays}: Every Step Stronger.
            </h1>
            <p class="text-teal-50 text-sm md:text-base leading-relaxed italic bg-white/10 p-3.5 rounded-2xl border border-white/10">
              "${p.dailyQuote.text}" — <span class="font-semibold text-white">${p.dailyQuote.author}</span>
            </p>
          </div>

          <!-- Quick Action Buttons -->
          <div class="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button onclick="openSOS()" class="pulse-emergency flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-sm shadow-xl transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <span>Craving SOS Button</span>
            </button>
            <button onclick="setPatientTab('ai')" class="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm backdrop-blur-md transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <span>Chat with AI Companion</span>
            </button>
          </div>
        </div>

        <!-- Decorative background circles -->
        <div class="absolute -right-12 -bottom-16 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
        <div class="absolute right-40 -top-20 w-52 h-52 rounded-full bg-teal-400/20 blur-xl pointer-events-none"></div>
      </div>

      <!-- KPI Key Metric Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <!-- Sober Streak -->
        <div class="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs card-hover">
          <div class="flex items-center justify-between text-slate-500 mb-2">
            <span class="text-xs font-bold uppercase tracking-wider">Current Streak</span>
            <span class="text-xl">🔥</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl sm:text-4xl font-extrabold text-slate-900">${p.consecutiveSoberDays}</span>
            <span class="text-xs font-semibold text-emerald-600">Consecutive Days</span>
          </div>
          <p class="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <span class="text-emerald-500">✓</span> Total Sober Days: <strong>${p.totalSoberDays} days</strong>
          </p>
        </div>

        <!-- Today's Activity Progress -->
        <div class="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs card-hover">
          <div class="flex items-center justify-between text-slate-500 mb-2">
            <span class="text-xs font-bold uppercase tracking-wider">Today's Progress</span>
            <span class="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">${completedActs}/${totalActs}</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl sm:text-4xl font-extrabold text-teal-600">${completionPct}%</span>
            <span class="text-xs text-slate-500">Activities</span>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-2.5 mt-3 overflow-hidden">
            <div class="bg-teal-500 h-full rounded-full transition-all duration-500" style="width: ${completionPct}%"></div>
          </div>
        </div>

        <!-- Reward Points & Level -->
        <div class="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs card-hover">
          <div class="flex items-center justify-between text-slate-500 mb-2">
            <span class="text-xs font-bold uppercase tracking-wider">Reward Points</span>
            <span class="text-xl">⭐</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl sm:text-4xl font-extrabold text-amber-500">${p.points.toLocaleString()}</span>
            <span class="text-xs font-semibold text-slate-500">pts</span>
          </div>
          <p class="text-xs text-slate-600 mt-2 font-medium">
            Level ${p.level}: <span class="text-teal-700 font-bold">${p.levelTitle}</span>
          </p>
        </div>

        <!-- Wellness Score (Extra #4) -->
        <div class="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs card-hover">
          <div class="flex items-center justify-between text-slate-500 mb-2">
            <span class="text-xs font-bold uppercase tracking-wider">Wellness Score</span>
            <span class="text-xl">🌿</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl sm:text-4xl font-extrabold text-slate-900">86</span>
            <span class="text-xs text-emerald-600 font-bold">/ 100</span>
          </div>
          <p class="text-[11px] text-slate-400 mt-2">
            Participation & routine index (Non-medical)
          </p>
        </div>

      </div>

      <!-- Main Two Column Content Area -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Left 2 Cols: Today's Activity Checklist -->
        <div class="lg:col-span-2 space-y-6">
          
          <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div class="flex items-center justify-between mb-5">
              <div>
                <h2 class="text-lg font-bold text-slate-900">Today's Recovery Routine</h2>
                <p class="text-xs text-slate-500">Tap to complete activities and earn reward points</p>
              </div>
              <button onclick="setPatientTab('activities')" class="text-xs font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1">
                View All 12 Activities →
              </button>
            </div>

            <!-- Checklist Cards -->
            <div class="space-y-3">
              ${p.activities.slice(0, 6).map(act => `
                <div class="flex items-center justify-between p-3.5 rounded-2xl border transition-all ${act.completed ? 'bg-teal-50/50 border-teal-200 text-slate-600' : 'bg-slate-50/50 border-slate-200 hover:bg-slate-50'}">
                  <div class="flex items-center gap-3.5">
                    <input type="checkbox" class="custom-checkbox" ${act.completed ? 'checked' : ''} onchange="toggleActivity('${act.id}')">
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-bold ${act.completed ? 'line-through text-slate-500' : 'text-slate-800'}">${act.title}</span>
                        ${act.counselorAssigned ? `<span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">Counsellor Assigned</span>` : ''}
                      </div>
                      <p class="text-xs text-slate-500">${act.desc} • ${act.minutes} mins</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 shrink-0">
                    <span class="text-xs font-bold px-2 py-1 rounded-lg ${act.completed ? 'bg-teal-100 text-teal-800' : 'bg-slate-200 text-slate-700'}">
                      +${act.points} pts
                    </span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Quick Interactive Extra Features: Mood Check-in & Hydration -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <!-- Daily Mood Check-in (Extra #3) -->
            <div class="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-bold text-slate-900">Daily Mood Check-in</h3>
                <span class="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">Logged: ${p.todayMood}</span>
              </div>
              <p class="text-xs text-slate-500 mb-3">Honoring your emotions prevents unexpressed triggers.</p>
              <div class="flex items-center justify-between gap-1">
                ${['Great', 'Good', 'Neutral', 'Struggling', 'Anxious'].map(m => {
                  const icons = { Great: '😄', Good: '🙂', Neutral: '😐', Struggling: '😔', Anxious: '😰' };
                  const active = p.todayMood === m;
                  return `
                    <button onclick="setMood('${m}')" class="flex-1 flex flex-col items-center py-2 px-1 rounded-2xl border transition-all ${active ? 'bg-teal-50 border-teal-500 scale-105 shadow-xs' : 'border-slate-100 hover:bg-slate-50'}">
                      <span class="text-xl">${icons[m]}</span>
                      <span class="text-[10px] font-bold mt-1 ${active ? 'text-teal-700' : 'text-slate-500'}">${m}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Drinking Water Reminders -->
            <div class="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-bold text-slate-900">Hydration Reminder</h3>
                <span class="text-xs font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md">${p.waterGlasses} of ${p.waterTarget} Glasses</span>
              </div>
              <p class="text-xs text-slate-500 mb-3">Flushes neurotoxins and curbs physical craving impulses.</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1.5 flex-wrap">
                  ${Array.from({ length: p.waterTarget }).map((_, idx) => `
                    <span class="text-xl ${idx < p.waterGlasses ? 'text-cyan-500' : 'text-slate-300'}">💧</span>
                  `).join('')}
                </div>
                <div class="flex items-center gap-1.5">
                  <button onclick="removeWaterGlass()" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center">-</button>
                  <button onclick="addWaterGlass()" class="w-8 h-8 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold flex items-center justify-center">+</button>
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- Right 1 Col: Upcoming Counsellor Appointment & Quick Links -->
        <div class="space-y-6">
          
          <!-- Upcoming Appointment Card -->
          <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">Clinical Appointment</span>
              <span class="text-xs text-slate-400">Confirmed</span>
            </div>
            
            <div class="flex items-start gap-3.5 mb-4">
              <img src="${p.assignedCounsellor.avatar}" class="w-12 h-12 rounded-2xl object-cover border-2 border-teal-500 shrink-0" alt="Counsellor">
              <div>
                <h3 class="text-sm font-bold text-slate-900">${p.assignedCounsellor.name}</h3>
                <p class="text-xs text-slate-500">${p.assignedCounsellor.title}</p>
                <p class="text-xs text-teal-700 font-medium mt-0.5">${p.assignedCounsellor.clinic}</p>
              </div>
            </div>

            <div class="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1.5 mb-4 text-xs">
              <div class="flex justify-between text-slate-600">
                <span>Date & Time:</span>
                <strong class="text-slate-800">${p.assignedCounsellor.nextAppointment}</strong>
              </div>
              <div class="flex justify-between text-slate-600">
                <span>Format:</span>
                <strong class="text-slate-800">${p.assignedCounsellor.type}</strong>
              </div>
            </div>

            <div class="flex gap-2">
              <button onclick="showToast('Connecting to Telehealth Secure Suite...', 'teal', 'Launching Video Call')" class="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-teal transition-all">
                Join Telehealth Call
              </button>
              <button onclick="requestCounsellorFollowup()" class="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors">
                Request Session
              </button>
            </div>
          </div>

          <!-- Extra Innovation Hub: Goals, Family Notes, Relapse Plan -->
          <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 class="text-sm font-bold text-slate-900">Innovative Recovery Tools</h3>
            
            <div class="space-y-2.5">
              <button onclick="setPatientTab('goals')" class="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100 transition-colors text-left">
                <div class="flex items-center gap-3">
                  <span class="text-lg">🎯</span>
                  <div>
                    <h4 class="text-xs font-bold text-slate-800">Positive Future Goals</h4>
                    <p class="text-[11px] text-slate-500">Marathon, career, family rebuilding</p>
                  </div>
                </div>
                <span class="text-xs text-slate-400">→</span>
              </button>

              <button onclick="setPatientTab('craving-journal')" class="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100 transition-colors text-left">
                <div class="flex items-center gap-3">
                  <span class="text-lg">📖</span>
                  <div>
                    <h4 class="text-xs font-bold text-slate-800">Craving Pattern Journal</h4>
                    <p class="text-[11px] text-slate-500">Analyze past triggers & coping tactics</p>
                  </div>
                </div>
                <span class="text-xs text-slate-400">→</span>
              </button>

              <button onclick="setPatientTab('relapse-plan')" class="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100 transition-colors text-left">
                <div class="flex items-center gap-3">
                  <span class="text-lg">🛡️</span>
                  <div>
                    <h4 class="text-xs font-bold text-slate-800">Relapse Support Plan</h4>
                    <p class="text-[11px] text-slate-500">Zero shame, instant 5-min safety net</p>
                  </div>
                </div>
                <span class="text-xs text-slate-400">→</span>
              </button>
            </div>
          </div>

          <!-- Family Support Card (Extra #7) -->
          <div class="bg-gradient-to-br from-pink-50/60 to-purple-50/60 rounded-3xl p-5 border border-pink-100 shadow-xs">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold text-pink-700 uppercase tracking-wide">Family Support Care Note</span>
              <span class="text-lg">💌</span>
            </div>
            <p class="text-xs text-slate-700 italic leading-relaxed">
              "${p.familyNotes[0].message}"
            </p>
            <p class="text-[11px] text-pink-700 font-bold mt-2 text-right">
              — ${p.familyNotes[0].from} (${p.familyNotes[0].date})
            </p>
          </div>

        </div>

      </div>

    </div>
  `;
}

// ------------------------------------------
// Patient Page B: My Recovery
// ------------------------------------------
function renderMyRecovery() {
  const p = store.state.patient;

  return `
    <div class="space-y-6 animate-fade-in">
      
      <!-- Top Recovery Counter Banner -->
      <div class="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
            <span>🌱 Recovery Began: Oct 12, 2026</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Your Sober Milestones & Journey</h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">Every single sober day rewires dopamine pathways and builds authentic freedom.</p>
        </div>

        <div class="flex items-center gap-6 bg-slate-50 px-6 py-4 rounded-3xl border border-slate-200">
          <div class="text-center">
            <div class="text-4xl font-black text-teal-600">${p.consecutiveSoberDays}</div>
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Consecutive Days</div>
          </div>
          <div class="h-10 w-px bg-slate-300"></div>
          <div class="text-center">
            <div class="text-4xl font-black text-slate-800">${p.totalSoberDays}</div>
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Sober Days</div>
          </div>
        </div>
      </div>

      <!-- Milestone Ladder: 7, 14, 30, 60, 90, 180, 365 Days -->
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
        <div>
          <h2 class="text-lg font-bold text-slate-900">Recovery Milestone Pathway</h2>
          <p class="text-xs text-slate-500">Key neuro-recovery benchmarks celebrated throughout your care programme</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          ${p.milestones.map(m => `
            <div class="rounded-2xl p-4 border text-center transition-all ${m.unlocked ? 'bg-teal-50/70 border-teal-300 shadow-xs' : 'bg-slate-50/60 border-slate-200 opacity-70'}">
              <div class="text-2xl mb-1">${m.badge}</div>
              <div class="text-xs font-extrabold text-slate-800">${m.days} Days</div>
              <div class="text-[11px] font-semibold text-slate-600 mt-0.5">${m.title}</div>
              <div class="mt-2">
                ${m.unlocked ? `
                  <span class="inline-block px-2 py-0.5 rounded-full bg-teal-600 text-white text-[10px] font-bold">Achieved!</span>
                ` : `
                  <span class="inline-block px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 text-[10px] font-medium">${m.daysLeft} days to go</span>
                `}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Calendar-Based Progress Tracker -->
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 class="text-lg font-bold text-slate-900">Calendar Sober Tracker (November 2026)</h2>
            <p class="text-xs text-slate-500">Green indicates verified sober day with completed mindful check-in</p>
          </div>
          <div class="flex items-center gap-3 text-xs">
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-teal-500"></span> Sober Day</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-amber-400"></span> Milestone</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-slate-200"></span> Future</span>
          </div>
        </div>

        <!-- Simulated Monthly Calendar Grid (30 Days) -->
        <div class="grid grid-cols-7 gap-2 text-center text-xs">
          ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => `<div class="font-bold text-slate-400 py-1">${d}</div>`).join('')}
          ${Array.from({ length: 30 }).map((_, i) => {
            const dayNum = i + 1;
            const isToday = dayNum === 23;
            const isMilestone = dayNum === 11; // Day 30 milestone
            const isPast = dayNum <= 23;

            return `
              <div class="p-2 sm:p-3 rounded-2xl border transition-all ${isPast ? isMilestone ? 'bg-amber-50 border-amber-300 font-bold' : 'bg-teal-50/80 border-teal-200 text-teal-900' : 'bg-slate-50/50 border-slate-100 text-slate-400'}">
                <div class="text-xs ${isPast ? 'font-bold' : ''}">${dayNum}</div>
                <div class="text-[10px] mt-1">
                  ${isPast ? (isMilestone ? '🏆 30D' : '✓ Clean') : '—'}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Recovery Journey Timeline (Extra #1) & Supportive Reset Button -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Timeline 2 cols -->
        <div class="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h2 class="text-lg font-bold text-slate-900">Recovery Journey Timeline</h2>
          <div class="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-teal-200">
            
            <div class="relative">
              <div class="absolute -left-6 top-1 w-4 h-4 rounded-full bg-teal-500 border-2 border-white"></div>
              <span class="text-xs font-bold text-teal-700">Nov 11, 2026</span>
              <h4 class="text-sm font-bold text-slate-900">30-Day Milestone "Blooming Resilience" Achieved!</h4>
              <p class="text-xs text-slate-600 mt-0.5">Brain fog lifted, sleep cycle stabilized, attended celebration session with Dr. Mitchell.</p>
            </div>

            <div class="relative">
              <div class="absolute -left-6 top-1 w-4 h-4 rounded-full bg-teal-500 border-2 border-white"></div>
              <span class="text-xs font-bold text-teal-700">Oct 26, 2026</span>
              <h4 class="text-sm font-bold text-slate-900">14-Day Milestone "Rooted Strength"</h4>
              <p class="text-xs text-slate-600 mt-0.5">Completed first full two weeks of daily walking and box breathing. Urges decreased by 40%.</p>
            </div>

            <div class="relative">
              <div class="absolute -left-6 top-1 w-4 h-4 rounded-full bg-teal-500 border-2 border-white"></div>
              <span class="text-xs font-bold text-teal-700">Oct 19, 2026</span>
              <h4 class="text-sm font-bold text-slate-900">7-Day Milestone "Seedling of Hope"</h4>
              <p class="text-xs text-slate-600 mt-0.5">First consecutive sober week in 3 years. Began connection with recovery buddy Liam.</p>
            </div>

            <div class="relative">
              <div class="absolute -left-6 top-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
              <span class="text-xs font-bold text-emerald-700">Oct 12, 2026</span>
              <h4 class="text-sm font-bold text-slate-900">Day 1: Enrolled in HopePath 90-Day IOP</h4>
              <p class="text-xs text-slate-600 mt-0.5">Intake evaluation completed. Made the courageous choice to take my life back.</p>
            </div>

          </div>
        </div>

        <!-- Right: Shame-Free Supportive Reset Process Card -->
        <div class="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-6 border border-teal-200/80 shadow-xs space-y-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl">🌱</span>
            <h3 class="text-base font-bold text-teal-950">Honest Check-In & Reset</h3>
          </div>
          <p class="text-xs text-slate-700 leading-relaxed">
            RENEW has a <strong>zero-shame, zero-punishment</strong> policy. If a setback occurred, honesty is the highest form of courage.
          </p>
          <div class="bg-white/80 p-3.5 rounded-2xl border border-teal-200 text-xs text-teal-900 space-y-1">
            <div class="font-bold">What happens during a reset:</div>
            <p>• Your prior 42 days of brain healing are <strong>never lost</strong>.</p>
            <p>• Triggers are recorded safely to strengthen your relapse plan.</p>
            <p>• Dr. Mitchell’s clinical team is notified with care, not condemnation.</p>
          </div>
          <button onclick="openResetModal()" class="w-full py-3 rounded-2xl bg-white border border-teal-300 hover:bg-teal-100/50 text-teal-800 font-bold text-xs shadow-xs transition-colors">
            Record Honest Reset (Shame-Free)
          </button>
        </div>

      </div>

    </div>
  `;
}

// ------------------------------------------
// Patient Page C: Daily Activities
// ------------------------------------------
function renderDailyActivities() {
  const p = store.state.patient;
  const categories = [
    { id: 'all', label: 'All Activities' },
    { id: 'mind', label: 'Mind & Mindfulness' },
    { id: 'body', label: 'Body & Somatic' },
    { id: 'social', label: 'Social & Family' },
    { id: 'growth', label: 'Personal Growth' }
  ];

  return `
    <div class="space-y-6 animate-fade-in">
      
      <!-- Header -->
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900">Daily Activity Management</h1>
          <p class="text-xs text-slate-500 mt-1">Activities are customized by your counsellor to rebuild healthy dopamine receptors.</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            ⭐ Earn +20 to +30 pts per task
          </span>
        </div>
      </div>

      <!-- 12 Required Activities Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${p.activities.map(act => {
          const categoryColors = {
            mind: 'bg-purple-50 text-purple-700 border-purple-200',
            body: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            social: 'bg-blue-50 text-blue-700 border-blue-200',
            growth: 'bg-amber-50 text-amber-700 border-amber-200'
          };
          const catClass = categoryColors[act.category] || 'bg-slate-50 text-slate-700 border-slate-200';

          return `
            <div class="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between card-hover transition-all ${act.completed ? 'bg-teal-50/30 border-teal-200' : ''}">
              <div>
                <div class="flex items-start justify-between gap-2 mb-3">
                  <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${catClass}">
                    ${act.category}
                  </span>
                  <span class="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    +${act.points} pts
                  </span>
                </div>

                <h3 class="text-base font-bold ${act.completed ? 'text-teal-900' : 'text-slate-800'} mb-1">${act.title}</h3>
                <p class="text-xs text-slate-500 leading-relaxed mb-4">${act.desc}</p>
                
                ${act.counselorAssigned ? `
                  <div class="inline-flex items-center gap-1.5 text-[11px] font-medium text-indigo-700 bg-indigo-50/70 px-2.5 py-1 rounded-xl mb-4">
                    <span>🩺</span>
                    <span>Counsellor Customized</span>
                  </div>
                ` : ''}
              </div>

              <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                <span class="text-xs text-slate-400 font-medium">⏱️ ${act.minutes} mins</span>
                <button onclick="toggleActivity('${act.id}')" class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${act.completed ? 'bg-teal-600 text-white shadow-xs' : 'bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700'}">
                  ${act.completed ? '✓ Completed' : 'Mark Complete'}
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Gratitude Journal Quick Input Modal / Card -->
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-bold text-slate-900">Gratitude Journaling Log</h3>
            <p class="text-xs text-slate-500">Writing down 3 daily gratitudes activates the prefrontal cortex</p>
          </div>
          <span class="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">+15 Points per Entry</span>
        </div>

        <form onsubmit="submitGratitude(event)" class="flex gap-3">
          <input id="gratitude-input" type="text" placeholder="What is one blessing or clear moment you are grateful for today?" class="flex-1 px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-teal-500 text-xs">
          <button type="submit" class="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-teal transition-all">
            Save Gratitude
          </button>
        </form>

        <div class="space-y-2 pt-2">
          ${p.gratitudeNotes.map(n => `
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-center gap-2">
              <span class="text-teal-600">✨</span>
              <span>${n}</span>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;
}

// ------------------------------------------
// Patient Page D: Craving SOS – PRIORITY FEATURE
// Calming full-screen emergency interface
// ------------------------------------------
function renderCravingSOS() {
  const p = store.state.patient;
  const currentPuzzle = SOS_PUZZLES[currentPuzzleIndex];

  return `
    <div class="sos-backdrop text-white rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-fade-in relative overflow-hidden">
      
      <!-- Top Emergency Header -->
      <div class="flex items-center justify-between border-b border-teal-500/20 pb-5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl sm:text-2xl font-black tracking-tight text-white">Craving SOS Calming Sanctuary</h1>
              <span class="px-2 py-0.5 rounded-full bg-rose-500/30 text-rose-300 border border-rose-500/40 text-[10px] font-bold">Active Support Protocol</span>
            </div>
            <p class="text-xs text-teal-200/80">Pause right now. You are safe, you are supported, and this urge WILL crest and pass.</p>
          </div>
        </div>

        <button onclick="exitSOS()" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-md transition-colors">
          Exit SOS Mode
        </button>
      </div>

      <!-- Step 1: Immediate Grounding Instructions & Animated Guided Breathing -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        <!-- Guided Breathing Orb Engine -->
        <div class="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 border border-white/10 text-center relative">
          <div class="text-xs font-bold text-teal-300 uppercase tracking-widest mb-4">Step 1: Guided Box Breathing</div>

          <!-- Pulsing Breathing Orb -->
          <div class="w-56 h-56 rounded-full flex items-center justify-center relative my-4">
            <div id="sos-orb" class="w-48 h-48 rounded-full gradient-teal opacity-90 transition-all duration-1000 flex flex-col items-center justify-center text-center p-4 shadow-teal">
              <span id="sos-phase-text" class="text-sm font-extrabold text-white uppercase tracking-wider">Inhale Gently</span>
              <span id="sos-timer-count" class="text-4xl font-black text-white mt-1">4s</span>
            </div>
          </div>

          <p class="text-xs text-teal-100/70 max-w-sm mt-2">
            Inhale 4s • Hold 4s • Exhale 4s • Rest 4s. Soft chimes guide your nervous system into parasympathetic relaxation.
          </p>
        </div>

        <!-- 5-4-3-2-1 Sensory Grounding Checklist -->
        <div class="bg-white/5 rounded-3xl p-6 border border-white/10 space-y-3">
          <div class="text-xs font-bold text-teal-300 uppercase tracking-widest mb-1">Step 2: 5-4-3-2-1 Sensory Grounding</div>
          <p class="text-xs text-teal-100/70">Bring your awareness out of future panic and back into this physical room:</p>

          <div class="space-y-2 text-xs">
            <label class="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded text-teal-500">
              <span><strong>5 things you can SEE:</strong> Look around for 5 unique colors or objects.</span>
            </label>
            <label class="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded text-teal-500">
              <span><strong>4 things you can FEEL:</strong> Feet flat on the floor, clothes on shoulders.</span>
            </label>
            <label class="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded text-teal-500">
              <span><strong>3 things you can HEAR:</strong> Ambient sounds, ticking clock, your own breathing.</span>
            </label>
            <label class="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded text-teal-500">
              <span><strong>2 things you can SMELL:</strong> Fresh air, essential oil, or clothing.</span>
            </label>
            <label class="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded text-teal-500">
              <span><strong>1 thing you can TASTE:</strong> A sip of cold water or mint.</span>
            </label>
          </div>
        </div>

      </div>

      <!-- Step 3 & 4: Trigger Identification & Personalized Coping Suggestions -->
      <div class="bg-white/5 rounded-3xl p-6 border border-white/10 space-y-4">
        <div class="text-xs font-bold text-teal-300 uppercase tracking-widest">Step 3 & 4: What Triggered This Craving?</div>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-semibold text-teal-200 mb-1">Select Dominant Trigger</label>
            <select id="sos-trigger-select" class="w-full bg-slate-900/80 border border-teal-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none">
              <option value="Stress & Work Tension">High Stress / Work Overwhelm</option>
              <option value="Fatigue & Exhaustion">HALT: Fatigue / Sleep Deprivation</option>
              <option value="Loneliness & Isolation">HALT: Loneliness / Feeling Unseen</option>
              <option value="Social Pressure / Environment">Social Pressure / Familiar Trigger Spot</option>
              <option value="Anger or Frustration">HALT: Anger / Conflict with Someone</option>
              <option value="Euphoric Recall">Euphoric Recall (Romancing the past)</option>
            </select>
          </div>

          <div class="sm:col-span-2">
            <label class="block text-xs font-semibold text-teal-200 mb-1">Immediate Personalized Coping Plan</label>
            <div class="p-3 rounded-xl bg-teal-950/40 border border-teal-500/30 text-xs text-teal-100">
              💡 <strong>Action:</strong> Splash cold water directly onto your forehead & cheeks. Drink a full glass of cold water. Urges naturally diminish within 12 minutes as cortisol metabolizes.
            </div>
          </div>
        </div>
      </div>

      <!-- Step 5: Distraction Activities (Word Puzzle + Mindful Shift) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Word Unscramble Mini-Game -->
        <div class="bg-white/5 rounded-3xl p-6 border border-white/10 space-y-3">
          <div class="text-xs font-bold text-teal-300 uppercase tracking-widest">Step 5: Cognitive Distraction Puzzle</div>
          <p class="text-xs text-teal-100/70">Unscramble this positive word to refocus neural bandwidth:</p>

          <div class="p-4 rounded-2xl bg-black/40 border border-teal-500/20 text-center space-y-2">
            <div class="text-2xl font-mono tracking-widest font-black text-amber-300">${currentPuzzle.scrambled}</div>
            <div class="text-[11px] text-teal-200 italic">Hint: ${currentPuzzle.hint}</div>
          </div>

          <div class="flex gap-2">
            <input id="puzzle-answer" type="text" placeholder="Type word in uppercase..." class="flex-1 bg-slate-900 border border-teal-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none uppercase">
            <button onclick="checkPuzzle()" class="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-900 font-extrabold text-xs">
              Solve
            </button>
          </div>
          <div id="puzzle-result" class="text-xs min-h-[20px]"></div>
        </div>

        <!-- One-Tap Emergency Contacts (Step 6 & 7) -->
        <div class="bg-white/5 rounded-3xl p-6 border border-white/10 space-y-4">
          <div class="text-xs font-bold text-teal-300 uppercase tracking-widest">Step 6 & 7: One-Tap Human Lifeline</div>
          
          <div class="space-y-2.5">
            <!-- Doctor Mitchell Contact -->
            <button onclick="triggerSOSClinicianCall()" class="w-full flex items-center justify-between p-3.5 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-left transition-colors">
              <div class="flex items-center gap-3">
                <span class="text-xl">🩺</span>
                <div>
                  <h4 class="text-xs font-bold text-white">Ping On-Call Clinician (${p.assignedCounsellor.name})</h4>
                  <p class="text-[11px] text-rose-200">Alerts clinic desk directly with high priority</p>
                </div>
              </div>
              <span class="text-xs font-bold px-2 py-1 rounded bg-rose-500 text-white">Alert Doctor</span>
            </button>

            <!-- Recovery Buddy Contact -->
            <button onclick="showToast('Calling Recovery Buddy Liam Chen (+1 555-345-6789)...', 'teal', 'Dialing Buddy')" class="w-full flex items-center justify-between p-3.5 rounded-2xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 text-left transition-colors">
              <div class="flex items-center gap-3">
                <span class="text-xl">🤝</span>
                <div>
                  <h4 class="text-xs font-bold text-white">Call Recovery Buddy (${p.buddies[0].name})</h4>
                  <p class="text-[11px] text-teal-200">Liam Chen: 68 Days Sober • Online</p>
                </div>
              </div>
              <span class="text-xs font-bold px-2 py-1 rounded bg-teal-500 text-slate-900">Call Now</span>
            </button>

            <!-- National Crisis Line -->
            <div class="p-3 rounded-2xl bg-slate-900/80 border border-slate-700 flex items-center justify-between text-xs">
              <div>
                <span class="font-bold text-white">National 24/7 Lifeline:</span>
                <span class="text-teal-300 font-mono ml-1">Dial 988 or 1-800-662-4357</span>
              </div>
              <span class="text-[10px] text-slate-400">Free & Confidential</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Step 8: Post-Craving Relief Rating & Completion -->
      <div class="bg-teal-950/60 rounded-3xl p-6 border border-teal-500/30 space-y-4">
        <div class="text-xs font-bold text-teal-300 uppercase tracking-widest">Step 8: How Do You Feel Now?</div>
        <p class="text-xs text-teal-100/70">Recording your post-session state logs data into your private Craving Pattern Journal and awards +40 reward points.</p>

        <div class="flex flex-col sm:flex-row gap-3">
          <button onclick="recordSOSOutcome('Much Better')" class="flex-1 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg transition-all">
            😊 Much Better / Urge Passed (+40 pts)
          </button>
          <button onclick="recordSOSOutcome('A Little Calmer')" class="flex-1 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-lg transition-all">
            🙂 A Little Calmer / Riding Wave (+40 pts)
          </button>
          <button onclick="recordSOSOutcome('Still Intense')" class="flex-1 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-lg transition-all">
            😰 Still Intense (Notify Care Team)
          </button>
        </div>
      </div>

    </div>
  `;
}

// ------------------------------------------
// Patient Page E: AI Recovery Companion
// ------------------------------------------
function renderAICompanion() {
  const p = store.state.patient;

  return `
    <div class="space-y-6 animate-fade-in">
      
      <!-- Top Disclaimer & Human Doctor Callout -->
      <div class="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl gradient-teal flex items-center justify-center text-white">
            🤖
          </div>
          <div>
            <h1 class="text-lg font-bold text-slate-900">RENEW AI Recovery Companion</h1>
            <p class="text-xs text-slate-500">Safe, empathetic, non-judgmental CBT guidance available 24/7.</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-[11px] text-slate-400 max-w-xs text-right hidden md:block">
            AI is an educational wellness tool and does not provide clinical diagnosis.
          </span>
          <button onclick="requestCounsellorFollowup()" class="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors">
            Speak with Human Counsellor
          </button>
        </div>
      </div>

      <!-- Chat Container -->
      <div class="bg-white rounded-3xl border border-slate-200/80 shadow-xs flex flex-col h-[520px] overflow-hidden">
        
        <!-- Messages Area -->
        <div id="ai-chat-box" class="flex-1 p-6 overflow-y-auto space-y-4">
          ${p.chatHistory.map(msg => `
            <div class="flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}">
              <div class="flex items-start gap-2.5 max-w-xl ${msg.role === 'user' ? 'flex-row-reverse' : ''}">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${msg.role === 'user' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'}">
                  ${msg.role === 'user' ? 'You' : '🤖'}
                </div>
                <div class="p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${msg.role === 'user' ? 'bg-teal-600 text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/60'}">
                  ${msg.text}
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Quick Prompt Pills -->
        <div class="p-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Quick prompts:</span>
          ${[
            "I'm feeling a sudden craving right now",
            "Help me reframe negative self-talk",
            "Suggest a 5-minute relaxation exercise",
            "How do I handle social pressure tonight?",
            "Explain dopamine healing on Day 42"
          ].map(pr => `
            <button onclick="sendAIPrompt('${pr}')" class="whitespace-nowrap px-3 py-1.5 rounded-full bg-white hover:bg-teal-50 hover:text-teal-700 border border-slate-200 text-xs text-slate-600 transition-colors">
              ${pr}
            </button>
          `).join('')}
        </div>

        <!-- Input Form -->
        <form onsubmit="sendAIMessage(event)" class="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
          <input id="ai-chat-input" type="text" placeholder="Share your thoughts, feelings, or ask for a coping technique..." class="flex-1 px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-teal-500 text-xs sm:text-sm">
          <button type="submit" class="px-5 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-teal transition-all flex items-center gap-1.5">
            <span>Send</span>
            <span>➤</span>
          </button>
          <button type="button" onclick="clearAIChat()" title="Clear Chat" class="p-3 rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            🗑️
          </button>
        </form>

      </div>

    </div>
  `;
}

// ------------------------------------------
// Patient Page F: Rewards & Gamification
// ------------------------------------------
function renderRewards() {
  const p = store.state.patient;

  return `
    <div class="space-y-6 animate-fade-in">
      
      <!-- Top Level Card -->
      <div class="bg-gradient-to-r from-amber-500 via-amber-600 to-teal-700 rounded-3xl p-7 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span class="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
            Gamified Habit Architecture
          </span>
          <h1 class="text-3xl font-extrabold mt-2">Level ${p.level}: ${p.levelTitle}</h1>
          <p class="text-amber-100 text-xs sm:text-sm mt-1 max-w-xl">
            Points are awarded strictly for completing healthy habits, mindfulness, and using safe coping strategies.
          </p>
        </div>

        <div class="text-center bg-black/20 p-5 rounded-3xl border border-white/20 backdrop-blur-md">
          <div class="text-4xl font-black text-amber-300">${p.points.toLocaleString()}</div>
          <div class="text-xs uppercase font-bold text-amber-100 mt-0.5">Total Points Earned</div>
          <div class="text-[11px] text-white/70 mt-1">Next Level: 2,000 pts</div>
        </div>
      </div>

      <!-- Badges Showcase -->
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div>
          <h2 class="text-lg font-bold text-slate-900">Achievement Badges Showcase</h2>
          <p class="text-xs text-slate-500">Bronze, Silver, Gold and Diamond tiers for sobriety benchmarks</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${p.badges.map(b => `
            <div class="p-5 rounded-3xl border transition-all ${b.earned ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-50/50 border-slate-100 opacity-60'}">
              <div class="flex items-center justify-between mb-2">
                <span class="text-3xl">${b.icon}</span>
                <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${b.tier === 'Diamond' ? 'bg-cyan-100 text-cyan-800' : b.tier === 'Gold' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}">
                  ${b.tier}
                </span>
              </div>
              <h3 class="text-sm font-bold text-slate-900">${b.name}</h3>
              <p class="text-xs text-slate-500 mt-1">${b.desc}</p>
              <div class="mt-3">
                ${b.earned ? `
                  <span class="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs">✓ Unlocked</span>
                ` : `
                  <span class="text-xs text-slate-400 font-medium">In Progress</span>
                `}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Weekly Wellness Challenges -->
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h2 class="text-lg font-bold text-slate-900">Active Weekly Challenges</h2>
        
        <div class="space-y-3">
          <div class="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-base">🧘</span>
                <h4 class="text-sm font-bold text-teal-950">7 Days of Mindful Mornings</h4>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-200 text-teal-800">+100 Bonus Pts</span>
              </div>
              <p class="text-xs text-slate-600 mt-1">Complete morning walking or yoga 7 consecutive days. (6 / 7 completed)</p>
            </div>
            <div class="w-full sm:w-36 bg-white rounded-full h-2.5 overflow-hidden border border-teal-200">
              <div class="bg-teal-600 h-full rounded-full" style="width: 85%"></div>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-cyan-50/60 border border-cyan-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-base">💧</span>
                <h4 class="text-sm font-bold text-cyan-950">Hydration Mastery</h4>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-200 text-cyan-800">+50 Bonus Pts</span>
              </div>
              <p class="text-xs text-slate-600 mt-1">Drink 8 glasses of water daily for 5 days. (4 / 5 completed)</p>
            </div>
            <div class="w-full sm:w-36 bg-white rounded-full h-2.5 overflow-hidden border border-cyan-200">
              <div class="bg-cyan-500 h-full rounded-full" style="width: 80%"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `;
}

// ------------------------------------------
// Patient Page G: Friends & Community
// ------------------------------------------
function renderFriends() {
  const p = store.state.patient;

  return `
    <div class="space-y-6 animate-fade-in">
      
      <!-- Privacy Safeguard Banner -->
      <div class="bg-slate-900 text-white rounded-3xl p-6 shadow-md flex items-start gap-4">
        <div class="text-2xl mt-1">🔒</div>
        <div class="space-y-1">
          <h3 class="text-sm font-bold text-white">Strict Medical Privacy Safeguard</h3>
          <p class="text-xs text-slate-300 leading-relaxed">
            Participation is 100% optional. <strong>Your relapse history, clinical notes, and sensitive addiction data are never shared or ranked publicly.</strong> Peers only see positive cheer messages and non-competitive wellness challenge participation.
          </p>
        </div>
      </div>

      <!-- Add Buddy by Code & Share My Code -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <!-- Share My Code -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-2">
          <span class="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">My Anonymous Invitation Code</span>
          <div class="flex items-center justify-between mt-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span class="text-base font-mono font-bold text-slate-800">RN-BUDDY-8492</span>
            <button onclick="navigator.clipboard?.writeText('RN-BUDDY-8492'); showToast('Invitation code copied to clipboard!', 'teal')" class="text-xs font-bold text-teal-600 hover:text-teal-800">
              Copy Code
            </button>
          </div>
          <p class="text-[11px] text-slate-400">Share only with trusted peers from your support group.</p>
        </div>

        <!-- Add Buddy Form -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-2">
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">Connect a Buddy</span>
          <form onsubmit="addBuddyByCode(event)" class="flex gap-2 mt-2">
            <input id="buddy-code-input" type="text" placeholder="Enter buddy code (e.g. RN-BUDDY-1234)" class="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500 uppercase">
            <button type="submit" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors">
              Connect
            </button>
          </form>
          <p class="text-[11px] text-slate-400">Instantly links for mutual encouragement.</p>
        </div>

      </div>

      <!-- Active Recovery Buddies List -->
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h2 class="text-lg font-bold text-slate-900">Your Connected Recovery Buddies</h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          ${p.buddies.map(b => `
            <div class="p-5 rounded-3xl border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between card-hover">
              <div>
                <div class="flex items-center gap-3 mb-3">
                  <img src="${b.avatar}" class="w-12 h-12 rounded-2xl object-cover border-2 border-teal-500" alt="${b.name}">
                  <div>
                    <h4 class="text-sm font-bold text-slate-900">${b.name}</h4>
                    <span class="text-[10px] font-mono text-slate-500">${b.code}</span>
                  </div>
                </div>

                <div class="bg-white p-2.5 rounded-xl border border-slate-200/60 space-y-1 text-xs mb-3">
                  <div class="flex justify-between text-slate-500">
                    <span>Status:</span>
                    <strong class="text-emerald-600">${b.status}</strong>
                  </div>
                  <div class="flex justify-between text-slate-500">
                    <span>Last Cheer:</span>
                    <span class="text-slate-700">${b.lastCheer}</span>
                  </div>
                </div>
              </div>

              <button onclick="sendBuddyCheer('${b.id}')" class="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-teal transition-all flex items-center justify-center gap-2">
                <span>👏</span>
                <span>Send Positive Cheer</span>
              </button>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;
}

// ------------------------------------------
// Patient Page H: My Progress (Interactive Charts)
// ------------------------------------------
function renderMyProgress() {
  const p = store.state.patient;

  return `
    <div class="space-y-6 animate-fade-in">
      
      <!-- Top Title -->
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900">My Progress & Clinical Analytics</h1>
          <p class="text-xs text-slate-500 mt-1">Holistic wellness trends tracking activities, sleep, and emotional patterns.</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
            📈 88% Weekly Consistency
          </span>
        </div>
      </div>

      <!-- Chart 1: Weekly Activity Completion (SVG Bar Chart) -->
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-bold text-slate-900">Weekly Activity Completion Trend</h2>
            <p class="text-xs text-slate-500">Number of daily recovery activities logged each day</p>
          </div>
          <span class="text-xs text-teal-700 font-bold bg-teal-50 px-2.5 py-1 rounded-full">Target: 6+ Daily</span>
        </div>

        <!-- Responsive Interactive SVG Bar Chart -->
        <div class="w-full h-64">
          <svg class="w-full h-full" viewBox="0 0 600 220">
            <!-- Grid lines -->
            <line x1="50" y1="20" x2="570" y2="20" stroke="#f1f5f9" stroke-width="1"></line>
            <line x1="50" y1="65" x2="570" y2="65" stroke="#f1f5f9" stroke-width="1"></line>
            <line x1="50" y1="110" x2="570" y2="110" stroke="#f1f5f9" stroke-width="1"></line>
            <line x1="50" y1="155" x2="570" y2="155" stroke="#f1f5f9" stroke-width="1"></line>
            <line x1="50" y1="190" x2="570" y2="190" stroke="#e2e8f0" stroke-width="1.5"></line>

            <!-- Y Axis labels -->
            <text x="35" y="25" font-size="10" fill="#94a3b8" text-anchor="end">12</text>
            <text x="35" y="70" font-size="10" fill="#94a3b8" text-anchor="end">9</text>
            <text x="35" y="115" font-size="10" fill="#94a3b8" text-anchor="end">6</text>
            <text x="35" y="160" font-size="10" fill="#94a3b8" text-anchor="end">3</text>
            <text x="35" y="193" font-size="10" fill="#94a3b8" text-anchor="end">0</text>

            <!-- Bars for Days (Mon - Sun) -->
            ${[
              { day: 'Mon', count: 8, x: 75, height: 110, y: 80 },
              { day: 'Tue', count: 9, x: 150, height: 125, y: 65 },
              { day: 'Wed', count: 10, x: 225, height: 140, y: 50 },
              { day: 'Thu', count: 7, x: 300, height: 95, y: 95 },
              { day: 'Fri', count: 11, x: 375, height: 155, y: 35 },
              { day: 'Sat', count: 8, x: 450, height: 110, y: 80 },
              { day: 'Today', count: 6, x: 525, height: 85, y: 105, current: true }
            ].map(b => `
              <g class="cursor-pointer group">
                <rect x="${b.x}" y="${b.y}" width="34" height="${b.height}" rx="8" fill="${b.current ? '#0d9488' : '#14b8a6'}" opacity="${b.current ? '1' : '0.85'}">
                  <title>${b.day}: ${b.count} activities</title>
                </rect>
                <text x="${b.x + 17}" y="${b.y - 6}" font-size="10" font-weight="bold" fill="#0f766e" text-anchor="middle">${b.count}</text>
                <text x="${b.x + 17}" y="206" font-size="11" fill="${b.current ? '#0d9488' : '#64748b'}" font-weight="${b.current ? 'bold' : 'normal'}" text-anchor="middle">${b.day}</text>
              </g>
            `).join('')}
          </svg>
        </div>
      </div>

      <!-- Charts 2 & 3: Sleep, Hydration & Wellness Correlation -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <!-- Sleep & Hydration Analytics -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 class="text-base font-bold text-slate-900">Sleep & Hydration Tracking</h3>
          <p class="text-xs text-slate-500">Restorative sleep reduces amygdala reactivity by over 30%</p>

          <div class="grid grid-cols-2 gap-4 pt-2">
            <div class="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
              <span class="text-xs font-bold text-indigo-700 uppercase tracking-wider">Average Sleep</span>
              <div class="text-3xl font-extrabold text-indigo-950 mt-1">${p.sleepHours} hrs</div>
              <p class="text-[11px] text-slate-500 mt-1">Quality: ${p.sleepQuality}</p>
            </div>

            <div class="p-4 rounded-2xl bg-cyan-50/60 border border-cyan-100">
              <span class="text-xs font-bold text-cyan-700 uppercase tracking-wider">Water Intake</span>
              <div class="text-3xl font-extrabold text-cyan-950 mt-1">${p.waterGlasses} glasses</div>
              <p class="text-[11px] text-slate-500 mt-1">Target: ${p.waterTarget} daily</p>
            </div>
          </div>

          <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed">
            🩺 <strong>Clinical Insight:</strong> Your sleep consistency correlates with a 65% reduction in afternoon craving spikes.
          </div>
        </div>

        <!-- Personal Achievement Statistics -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 class="text-base font-bold text-slate-900">Personal Achievement Statistics</h3>
          <p class="text-xs text-slate-500">Aggregated recovery milestones since Oct 12, 2026</p>

          <div class="grid grid-cols-2 gap-3 pt-1">
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div class="text-2xl font-black text-teal-600">312</div>
              <div class="text-[11px] text-slate-500 font-medium">Total Activities Done</div>
            </div>
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div class="text-2xl font-black text-emerald-600">14</div>
              <div class="text-[11px] text-slate-500 font-medium">SOS Cravings Resisted</div>
            </div>
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div class="text-2xl font-black text-amber-500">420 min</div>
              <div class="text-[11px] text-slate-500 font-medium">Mindful Breathing Logged</div>
            </div>
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div class="text-2xl font-black text-indigo-600">8</div>
              <div class="text-[11px] text-slate-500 font-medium">Clinical Sessions Attended</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  `;
}

// ------------------------------------------
// Patient Page I: Rehabilitation Session Tracker
// ------------------------------------------
function renderSessionTracker() {
  const p = store.state.patient;
  const s = p.sessionTracker;
  const progressPct = Math.round((s.daysCompleted / s.totalProgrammeDays) * 100);

  return `
    <div class="space-y-6 animate-fade-in">
      
      <!-- Programme Hero Summary -->
      <div class="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
            Clinical Care Programme
          </span>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">${s.programmeName}</h1>
          <p class="text-xs text-slate-500 mt-1">${s.centreName} • Start Date: Oct 12, 2026</p>
        </div>

        <!-- Big Progress Donut / Stats -->
        <div class="flex items-center gap-6 bg-slate-50 px-6 py-4 rounded-3xl border border-slate-200">
          <div>
            <div class="text-3xl font-black text-teal-600">${s.daysCompleted} / ${s.totalProgrammeDays}</div>
            <div class="text-xs font-bold text-slate-500 uppercase tracking-wider">Days Completed (${progressPct}%)</div>
          </div>
          <div class="h-10 w-px bg-slate-300"></div>
          <div>
            <div class="text-3xl font-black text-amber-500">${s.daysRemaining}</div>
            <div class="text-xs font-bold text-slate-500 uppercase tracking-wider">Days Remaining</div>
          </div>
        </div>
      </div>

      <!-- Linear Programme Timeline Progress Bar -->
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
        <div class="flex items-center justify-between text-xs">
          <span class="font-bold text-slate-700">Programme Horizon Progress</span>
          <span class="font-bold text-teal-700">${progressPct}% Complete</span>
        </div>
        <div class="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div class="gradient-teal h-full rounded-full transition-all duration-500" style="width: ${progressPct}%"></div>
        </div>
        <div class="flex justify-between text-[11px] text-slate-400">
          <span>Start: Oct 12, 2026</span>
          <span>Expected Completion: Jan 10, 2027</span>
        </div>
      </div>

      <!-- Programme Phase Benchmarks & Clinical Appointments -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <!-- Programme Phases -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h2 class="text-base font-bold text-slate-900">Clinical Rehabilitation Phases</h2>
          
          <div class="space-y-3">
            ${s.milestonesCompleted.map(m => `
              <div class="p-3.5 rounded-2xl border flex items-center justify-between ${m.status === 'Completed' ? 'bg-teal-50/50 border-teal-200' : m.status === 'In Progress' ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-50/50 border-slate-200'}">
                <div>
                  <h4 class="text-xs font-bold text-slate-900">${m.name}</h4>
                  <p class="text-[11px] text-slate-500">${m.date}</p>
                </div>
                <span class="text-[10px] font-bold px-2.5 py-1 rounded-full ${m.status === 'Completed' ? 'bg-teal-600 text-white' : m.status === 'In Progress' ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'}">
                  ${m.status}
                </span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Upcoming Appointments -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-base font-bold text-slate-900">Upcoming Appointments</h2>
            <button onclick="requestCounsellorFollowup()" class="text-xs font-bold text-teal-600 hover:text-teal-800">
              + Request New
            </button>
          </div>

          <div class="space-y-3">
            ${s.upcomingAppointments.map(app => `
              <div class="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div class="flex items-center justify-between">
                  <h4 class="text-xs font-bold text-slate-900">${app.type}</h4>
                  <span class="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">${app.date} • ${app.time}</span>
                </div>
                <div class="text-[11px] text-slate-600">
                  <span>With: <strong>${app.counsellor}</strong></span> • <span>${app.location}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

    </div>
  `;
}

// ------------------------------------------
// Patient Page J: Profile & Settings
// ------------------------------------------
function renderProfile() {
  const p = store.state.patient;

  return `
    <div class="space-y-6 animate-fade-in max-w-4xl mx-auto">
      
      <!-- Profile Header -->
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-5">
        <img src="${p.avatar}" class="w-20 h-20 rounded-3xl object-cover border-4 border-teal-500 shadow-md" alt="Profile">
        <div class="text-center sm:text-left space-y-1">
          <div class="flex items-center justify-center sm:justify-start gap-2">
            <h1 class="text-2xl font-bold text-slate-900">${p.name}</h1>
            <span class="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold">${p.levelTitle}</span>
          </div>
          <p class="text-xs font-mono text-slate-500">Unique Patient ID: ${p.id}</p>
          <p class="text-xs text-slate-500">Email: ${p.email} • Phone: ${p.phone}</p>
        </div>
      </div>

      <!-- Settings Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Emergency Contacts & Caregiver -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <h3 class="text-sm font-bold text-slate-900">Emergency & Caregiver Contact</h3>
          <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
            <div class="font-bold text-slate-800">${p.emergencyContact.name}</div>
            <div class="text-slate-500">${p.emergencyContact.relation}</div>
            <div class="text-teal-700 font-mono font-medium">${p.emergencyContact.phone}</div>
          </div>
        </div>

        <!-- Assigned Counsellor Profile -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <h3 class="text-sm font-bold text-slate-900">Assigned Addiction Specialist</h3>
          <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
            <div class="font-bold text-slate-800">${p.assignedCounsellor.name}</div>
            <div class="text-slate-500">${p.assignedCounsellor.clinic}</div>
            <div class="text-teal-700 font-mono font-medium">${p.assignedCounsellor.phone}</div>
          </div>
        </div>

      </div>

      <!-- Recovery Preferences & Reset Prototype Button -->
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 class="text-sm font-bold text-slate-900">Prototype Demo Actions</h3>
        <p class="text-xs text-slate-500">You can reset the local prototype state back to fresh demo defaults at any time.</p>
        <button onclick="store.reset()" class="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors">
          Reset Demo Data to Initial State
        </button>
      </div>

    </div>
  `;
}

// ------------------------------------------
// Extra Innovative Feature Pages
// ------------------------------------------

// Extra #6: Positive Future Goals
function renderFutureGoalsPage() {
  const p = store.state.patient;

  return `
    <div class="space-y-6 animate-fade-in">
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <button onclick="setPatientTab('home')" class="text-xs font-bold text-teal-600 mb-1">← Back to Dashboard</button>
          <h1 class="text-2xl font-extrabold text-slate-900">Positive Future Goals</h1>
          <p class="text-xs text-slate-500">Recovery is not just quitting substances; it is building a life you love waking up to.</p>
        </div>
      </div>

      <!-- Create New Goal Form -->
      <form onsubmit="addFutureGoal(event)" class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
        <h3 class="text-sm font-bold text-slate-900">Set a New Long-Term Aspiration</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input id="goal-title" type="text" placeholder="Goal name (e.g. Learn guitar, Start pottery, Run 10k)..." class="sm:col-span-2 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-500" required>
          <input id="goal-date" type="text" placeholder="Target timeline (e.g. June 2027)" class="px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-500">
        </div>
        <button type="submit" class="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-teal">
          Create Goal (+25 pts)
        </button>
      </form>

      <!-- Goals List -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        ${p.futureGoals.map(g => `
          <div class="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <span class="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full uppercase">${g.category}</span>
            <h3 class="text-base font-bold text-slate-900">${g.title}</h3>
            <p class="text-xs text-slate-500">${g.notes}</p>
            <div class="space-y-1">
              <div class="flex justify-between text-[11px] font-bold text-slate-600">
                <span>Progress</span>
                <span>${g.progress}%</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div class="bg-teal-500 h-full rounded-full" style="width: ${g.progress}%"></div>
              </div>
            </div>
            <div class="text-[11px] text-slate-400">Target: ${g.targetDate}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Extra #2: Craving Pattern Journal
function renderCravingJournalPage() {
  const p = store.state.patient;

  return `
    <div class="space-y-6 animate-fade-in">
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <button onclick="setPatientTab('home')" class="text-xs font-bold text-teal-600 mb-1">← Back to Dashboard</button>
        <h1 class="text-2xl font-extrabold text-slate-900">Craving Pattern Journal</h1>
        <p class="text-xs text-slate-500">Transforming intense urges into scientific data to protect your sobriety.</p>
      </div>

      <div class="space-y-3">
        ${p.cravingJournal.map(cj => `
          <div class="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">Trigger: ${cj.trigger}</span>
                <span class="text-xs font-semibold text-slate-400 font-mono">${cj.date}</span>
              </div>
              <span class="text-xs font-bold ${cj.relieved ? 'text-emerald-600' : 'text-amber-600'}">
                ${cj.relieved ? '✓ Urge Conquered' : 'In Progress'}
              </span>
            </div>
            <p class="text-xs text-slate-700 leading-relaxed">${cj.notes}</p>
            <div class="text-[11px] text-teal-700 font-medium">Coping Applied: ${cj.coping} (Intensity: ${cj.intensity}/10)</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Extra #10: Relapse Support Plan
function renderRelapsePlanPage() {
  const p = store.state.patient;
  const rp = p.relapsePlan;

  return `
    <div class="space-y-6 animate-fade-in">
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <button onclick="setPatientTab('home')" class="text-xs font-bold text-teal-600 mb-1">← Back to Dashboard</button>
        <h1 class="text-2xl font-extrabold text-slate-900">My Relapse Support Plan</h1>
        <p class="text-xs text-slate-500">Your personalized emergency safety net created in partnership with Dr. Mitchell.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- 5-Minute Action Steps -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <h3 class="text-base font-bold text-slate-900">Immediate 5-Minute Emergency Protocol</h3>
          <div class="space-y-2 text-xs text-slate-700">
            ${rp.fiveMinuteSteps.map(step => `
              <div class="p-3 rounded-2xl bg-teal-50/60 border border-teal-100 font-medium">${step}</div>
            `).join('')}
          </div>
        </div>

        <!-- Warning Signs & Personal Triggers -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div>
            <h3 class="text-base font-bold text-slate-900">My Early Warning Signs</h3>
            <ul class="list-disc list-inside text-xs text-slate-600 mt-1 space-y-1">
              ${rp.warningSigns.map(w => `<li>${w}</li>`).join('')}
            </ul>
          </div>

          <div class="pt-3 border-t border-slate-100">
            <h3 class="text-base font-bold text-slate-900">Personal High-Risk Triggers</h3>
            <ul class="list-disc list-inside text-xs text-slate-600 mt-1 space-y-1">
              ${rp.personalTriggers.map(t => `<li>${t}</li>`).join('')}
            </ul>
          </div>
        </div>

      </div>
    </div>
  `;
}

// ==========================================
// 10. CLINICAL REHABILITATION CENTRE ADMIN PORTAL
// ==========================================

function renderAdminPortal() {
  const tab = store.state.adminTab;
  switch (tab) {
    case 'overview': return renderAdminOverview();
    case 'patients': return renderAdminPatients();
    case 'activities-admin': return renderAdminActivities();
    case 'alerts': return renderAdminAlerts();
    case 'counselling': return renderAdminCounselling();
    case 'analytics': return renderAdminAnalytics();
    case 'reports': return renderAdminReports();
    case 'settings': return renderAdminSettings();
    default: return renderAdminOverview();
  }
}

// ------------------------------------------
// Admin Page 1: Overview
// ------------------------------------------
function renderAdminOverview() {
  const a = store.state.admin;

  return `
    <div class="space-y-6 animate-fade-in">
      
      <!-- Centre Banner -->
      <div class="bg-slate-900 text-white rounded-3xl p-7 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-mono mb-2">
            <span>🏥 ${a.centreName}</span>
            <span>•</span>
            <span>Clinical Oversight Hub</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">Clinical Care & Monitoring Dashboard</h1>
          <p class="text-slate-400 text-xs sm:text-sm mt-1">Logged in as <strong>${a.counsellorName}</strong> (${a.role})</p>
        </div>

        <div class="flex gap-3">
          <button onclick="openRegisterPatientModal()" class="px-5 py-3 rounded-2xl bg-teal-500 hover:bg-teal-600 text-slate-900 font-extrabold text-xs shadow-teal transition-all">
            + Register New Patient
          </button>
        </div>
      </div>

      <!-- Real-time Alerts Banner if pending SOS -->
      ${a.cravingAlerts.some(al => al.status === 'Pending') ? `
        <div class="p-4 rounded-3xl bg-rose-50 border border-rose-200 flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="w-3 h-3 rounded-full bg-rose-500 animate-ping"></span>
            <span class="text-xs font-bold text-rose-900">
              URGENT: ${a.cravingAlerts.filter(al => al.status === 'Pending').length} Craving SOS Incidents Require Clinical Review
            </span>
          </div>
          <button onclick="setAdminTab('alerts')" class="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700">
            Review Alerts Now →
          </button>
        </div>
      ` : ''}

      <!-- Clinical KPIs -->
      <div class="grid grid-cols-2 lg:grid-cols-6 gap-4">
        
        <div class="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs">
          <span class="text-[11px] font-bold text-slate-400 uppercase">Total Patients</span>
          <div class="text-2xl font-black text-slate-900 mt-1">${a.stats.totalRegistered}</div>
        </div>

        <div class="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs">
          <span class="text-[11px] font-bold text-slate-400 uppercase">Active Enrolled</span>
          <div class="text-2xl font-black text-teal-600 mt-1">${a.stats.activePatients}</div>
        </div>

        <div class="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs">
          <span class="text-[11px] font-bold text-slate-400 uppercase">Daily Activity Adherence</span>
          <div class="text-2xl font-black text-emerald-600 mt-1">${a.stats.dailyActivityRate}%</div>
        </div>

        <div class="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs">
          <span class="text-[11px] font-bold text-slate-400 uppercase">Needs Follow-Up</span>
          <div class="text-2xl font-black text-amber-500 mt-1">${a.stats.patientsRequiringFollowUp}</div>
        </div>

        <div class="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs">
          <span class="text-[11px] font-bold text-slate-400 uppercase">Pending Appts</span>
          <div class="text-2xl font-black text-indigo-600 mt-1">${a.stats.pendingAppointments}</div>
        </div>

        <div class="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs">
          <span class="text-[11px] font-bold text-slate-400 uppercase">SOS Alerts</span>
          <div class="text-2xl font-black text-rose-500 mt-1">${a.cravingAlerts.length}</div>
        </div>

      </div>

      <!-- Quick Patient Triage Table -->
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-bold text-slate-900">Enrolled Patients Roster</h2>
            <p class="text-xs text-slate-500">Real-time recovery tracking and adherence monitoring</p>
          </div>
          <button onclick="setAdminTab('patients')" class="text-xs font-bold text-teal-600 hover:text-teal-800">
            View Complete Directory →
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold">
                <th class="py-3 px-3">Patient</th>
                <th class="py-3 px-3">Substance Focus</th>
                <th class="py-3 px-3">Streak</th>
                <th class="py-3 px-3">Adherence</th>
                <th class="py-3 px-3">Counsellor</th>
                <th class="py-3 px-3">Status</th>
                <th class="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${a.patients.slice(0, 5).map(pt => `
                <tr class="hover:bg-slate-50/50 transition-colors">
                  <td class="py-3 px-3">
                    <div class="font-bold text-slate-900">${pt.name}</div>
                    <div class="text-[10px] font-mono text-slate-400">${pt.id}</div>
                  </td>
                  <td class="py-3 px-3 text-slate-600">${pt.substance}</td>
                  <td class="py-3 px-3">
                    <span class="font-bold text-teal-700">${pt.streak} Days</span>
                  </td>
                  <td class="py-3 px-3">
                    <div class="flex items-center gap-2">
                      <div class="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div class="bg-teal-500 h-full rounded-full" style="width: ${pt.adherence}%"></div>
                      </div>
                      <span class="text-[11px] font-bold text-slate-700">${pt.adherence}%</span>
                    </div>
                  </td>
                  <td class="py-3 px-3 text-slate-600">${pt.counsellor}</td>
                  <td class="py-3 px-3">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${pt.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}">
                      ${pt.status}
                    </span>
                  </td>
                  <td class="py-3 px-3 text-right">
                    <button onclick="openPatientDetailsModal('${pt.id}')" class="px-3 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 font-bold text-[11px]">
                      View Record
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

// ------------------------------------------
// Admin Page 2: Patient Management
// ------------------------------------------
function renderAdminPatients() {
  const a = store.state.admin;

  return `
    <div class="space-y-6 animate-fade-in">
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900">Patient Management Directory</h1>
          <p class="text-xs text-slate-500">Assign counsellors, set recovery programme durations, and monitor adherence.</p>
        </div>
        <button onclick="openRegisterPatientModal()" class="px-5 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-teal">
          + Register New Patient
        </button>
      </div>

      <!-- Patients Full Table -->
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold">
              <th class="py-3 px-3">Patient ID</th>
              <th class="py-3 px-3">Full Name</th>
              <th class="py-3 px-3">Substance Focus</th>
              <th class="py-3 px-3">Sober Days</th>
              <th class="py-3 px-3">Programme Days Left</th>
              <th class="py-3 px-3">Assigned Clinician</th>
              <th class="py-3 px-3">Status</th>
              <th class="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${a.patients.map(pt => `
              <tr class="hover:bg-slate-50/50 transition-colors">
                <td class="py-3.5 px-3 font-mono font-bold text-slate-500">${pt.id}</td>
                <td class="py-3.5 px-3 font-bold text-slate-900">${pt.name}</td>
                <td class="py-3.5 px-3 text-slate-600">${pt.substance}</td>
                <td class="py-3.5 px-3 font-bold text-teal-700">${pt.streak} Days</td>
                <td class="py-3.5 px-3 text-slate-700">${pt.daysLeft} of ${pt.programmeDays} days</td>
                <td class="py-3.5 px-3 text-slate-600">${pt.counsellor}</td>
                <td class="py-3.5 px-3">
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${pt.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}">
                    ${pt.status}
                  </span>
                </td>
                <td class="py-3.5 px-3 text-right">
                  <button onclick="openPatientDetailsModal('${pt.id}')" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-700 font-bold text-xs transition-colors">
                    Manage Patient
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ------------------------------------------
// Admin Page 3: Activity Customization
// ------------------------------------------
function renderAdminActivities() {
  const p = store.state.patient;

  return `
    <div class="space-y-6 animate-fade-in">
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900">Activity Customization & Assignment</h1>
          <p class="text-xs text-slate-500">Clinicians can toggle and prescribe personalized recovery habits for patients.</p>
        </div>
      </div>

      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
        <h3 class="text-sm font-bold text-slate-900">Currently Prescribed for Alex Rivera (RN-8492)</h3>
        
        <div class="space-y-2">
          ${p.activities.map(act => `
            <div class="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <span class="text-sm font-bold text-slate-800">${act.title}</span>
                <p class="text-xs text-slate-500">${act.desc} • ${act.category}</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">${act.points} pts</span>
                <span class="text-xs font-semibold px-2 py-0.5 rounded-md ${act.counselorAssigned ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-200 text-slate-600'}">
                  ${act.counselorAssigned ? 'Prescribed' : 'Optional'}
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ------------------------------------------
// Admin Page 4: Craving SOS Alerts
// ------------------------------------------
function renderAdminAlerts() {
  const a = store.state.admin;

  return `
    <div class="space-y-6 animate-fade-in">
      
      <!-- Ethics Safeguard Disclaimer -->
      <div class="bg-slate-900 text-white rounded-3xl p-6 shadow-md flex items-start gap-4">
        <div class="text-2xl">⚖️</div>
        <div>
          <h3 class="text-sm font-bold text-white">Clinical Ethics & Non-Predictive AI Standard</h3>
          <p class="text-xs text-slate-300 mt-1 leading-relaxed">
            RENEW strictly follows clinical best practices: <strong>We do NOT automatically classify patients as relapsed or predict relapse from engagement data.</strong> All alerts represent self-reported support requests requiring human clinician review.
          </p>
        </div>
      </div>

      <!-- Alerts Queue -->
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-slate-900">Real-Time Craving SOS & Distress Queue</h2>
          <span class="text-xs text-slate-500 font-mono">${a.cravingAlerts.length} Incidents Logged</span>
        </div>

        <div class="space-y-4">
          ${a.cravingAlerts.map(al => `
            <div class="p-5 rounded-3xl border transition-all ${al.status === 'Pending' ? 'bg-rose-50/70 border-rose-300' : al.status === 'In Progress' ? 'bg-amber-50/70 border-amber-300' : 'bg-slate-50 border-slate-200'}">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div class="flex items-center gap-2.5">
                  <span class="text-base font-bold text-slate-900">${al.patientName}</span>
                  <span class="text-xs font-mono text-slate-500 font-bold">${al.patientId}</span>
                  <span class="text-xs font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">Intensity: ${al.intensity}/10</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-slate-400 font-mono">${al.timestamp}</span>
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold ${al.status === 'Pending' ? 'bg-rose-600 text-white' : al.status === 'In Progress' ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'}">
                    ${al.status}
                  </span>
                </div>
              </div>

              <p class="text-xs text-slate-700 mb-3 leading-relaxed">
                <strong>Trigger:</strong> ${al.trigger} • <strong>Coping Applied:</strong> ${al.coping}
              </p>
              <p class="text-xs text-slate-600 italic bg-white/80 p-2.5 rounded-xl border border-slate-200/60 mb-3">
                "${al.notes}"
              </p>

              <!-- Status Action Buttons -->
              <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/60">
                <span class="text-xs text-slate-400 mr-2">Change Status:</span>
                <button onclick="updateSOSStatus('${al.id}', 'Pending')" class="px-3 py-1 rounded-lg text-xs font-bold ${al.status === 'Pending' ? 'bg-rose-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}">
                  Pending
                </button>
                <button onclick="updateSOSStatus('${al.id}', 'In Progress')" class="px-3 py-1 rounded-lg text-xs font-bold ${al.status === 'In Progress' ? 'bg-amber-500 text-white' : 'bg-white text-slate-700 border border-slate-200'}">
                  In Progress
                </button>
                <button onclick="updateSOSStatus('${al.id}', 'Resolved')" class="px-3 py-1 rounded-lg text-xs font-bold ${al.status === 'Resolved' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}">
                  Resolved
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;
}

// ------------------------------------------
// Admin Page 5: Counselling Appointments
// ------------------------------------------
function renderAdminCounselling() {
  const a = store.state.admin;

  return `
    <div class="space-y-6 animate-fade-in">
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900">Clinical Counselling Schedule</h1>
          <p class="text-xs text-slate-500">Individual CBT therapy sessions and alumni group circles</p>
        </div>
      </div>

      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
        ${a.counsellingSchedule.map(cs => `
          <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 class="text-sm font-bold text-slate-900">${cs.patientName}</h4>
              <p class="text-xs text-slate-500">${cs.type} • ${cs.room}</p>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg">${cs.time}</span>
              <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">${cs.status}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ------------------------------------------
// Admin Page 6: Clinical Analytics
// ------------------------------------------
function renderAdminAnalytics() {
  return `
    <div class="space-y-6 animate-fade-in">
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <h1 class="text-2xl font-extrabold text-slate-900">Centre-Wide Clinical Analytics</h1>
        <p class="text-xs text-slate-500">Aggregate patient engagement, milestone velocity, and follow-up resolution metrics.</p>
      </div>

      <!-- Analytics SVG Chart: 8-Week Patient Engagement -->
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-bold text-slate-900">8-Week Active Patient Retention & Engagement</h3>
            <p class="text-xs text-slate-500">Weekly active percentage of patients completing recovery tasks</p>
          </div>
          <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Average: 89.4%</span>
        </div>

        <div class="w-full h-64">
          <svg class="w-full h-full" viewBox="0 0 600 220">
            <!-- Grid lines -->
            <line x1="50" y1="30" x2="570" y2="30" stroke="#f1f5f9" stroke-width="1"></line>
            <line x1="50" y1="80" x2="570" y2="80" stroke="#f1f5f9" stroke-width="1"></line>
            <line x1="50" y1="130" x2="570" y2="130" stroke="#f1f5f9" stroke-width="1"></line>
            <line x1="50" y1="180" x2="570" y2="180" stroke="#e2e8f0" stroke-width="1.5"></line>

            <!-- Y Axis labels -->
            <text x="35" y="35" font-size="10" fill="#94a3b8" text-anchor="end">100%</text>
            <text x="35" y="85" font-size="10" fill="#94a3b8" text-anchor="end">75%</text>
            <text x="35" y="135" font-size="10" fill="#94a3b8" text-anchor="end">50%</text>
            <text x="35" y="183" font-size="10" fill="#94a3b8" text-anchor="end">25%</text>

            <!-- Spline Line -->
            <path d="M 70 95 Q 140 70, 210 65 T 350 50 T 490 45 T 560 40" fill="none" stroke="#0d9488" stroke-width="3.5"></path>
            <!-- Area under line -->
            <path d="M 70 95 Q 140 70, 210 65 T 350 50 T 490 45 T 560 40 L 560 180 L 70 180 Z" fill="rgba(13, 148, 136, 0.12)"></path>

            <!-- Points on Line -->
            ${[
              { w: 'W1', x: 70, y: 95, val: '78%' },
              { w: 'W2', x: 140, y: 75, val: '82%' },
              { w: 'W3', x: 210, y: 65, val: '86%' },
              { w: 'W4', x: 280, y: 60, val: '88%' },
              { w: 'W5', x: 350, y: 50, val: '91%' },
              { w: 'W6', x: 420, y: 48, val: '92%' },
              { w: 'W7', x: 490, y: 45, val: '93%' },
              { w: 'W8', x: 560, y: 40, val: '95%' }
            ].map(pt => `
              <circle cx="${pt.x}" cy="${pt.y}" r="5" fill="#0d9488" stroke="#ffffff" stroke-width="2"></circle>
              <text x="${pt.x}" y="${pt.y - 10}" font-size="10" font-weight="bold" fill="#0f766e" text-anchor="middle">${pt.val}</text>
              <text x="${pt.x}" y="196" font-size="11" fill="#64748b" text-anchor="middle">${pt.w}</text>
            `).join('')}
          </svg>
        </div>
      </div>

    </div>
  `;
}

// ------------------------------------------
// Admin Page 7: Compliance & Reports
// ------------------------------------------
function renderAdminReports() {
  const p = store.state.patient;

  return `
    <div class="space-y-6 animate-fade-in">
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900">Clinical Reports & Documentation</h1>
          <p class="text-xs text-slate-500">Compliant with 42 CFR Part 2 and HIPAA confidentiality standards.</p>
        </div>
        <button onclick="window.print()" class="px-5 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-teal">
          🖨️ Print / Export Report
        </button>
      </div>

      <!-- Individual Patient Clinical Summary Card -->
      <div class="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-6 card-print">
        <div class="border-b border-slate-200 pb-5 flex justify-between items-start">
          <div>
            <div class="text-lg font-black text-slate-900 tracking-tight">HOPEPATH RECOVERY CLINIC • CLINICAL OUTCOMES REPORT</div>
            <p class="text-xs text-slate-500">Confidential Medical Record • Patient Consent: Active</p>
          </div>
          <span class="text-xs font-mono text-slate-400">Date: Nov 23, 2026</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span class="text-slate-400">Patient:</span>
            <div class="font-bold text-slate-900">${p.name}</div>
          </div>
          <div>
            <span class="text-slate-400">ID:</span>
            <div class="font-mono font-bold text-slate-900">${p.id}</div>
          </div>
          <div>
            <span class="text-slate-400">Streak:</span>
            <div class="font-bold text-teal-700">${p.consecutiveSoberDays} Days</div>
          </div>
          <div>
            <span class="text-slate-400">Adherence:</span>
            <div class="font-bold text-emerald-600">88.4%</div>
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-2">
          <h4 class="font-bold text-slate-900">Clinician Summary Statement</h4>
          <p class="leading-relaxed">
            Patient Alex Rivera has sustained 42 consecutive self-reported sober days with high engagement in morning mindfulness and somatic activities. Demonstrated successful utilization of the Craving SOS protocol during work-related stress spikes without relapse. Next milestone review set for 60-day mark.
          </p>
        </div>

        <div class="pt-4 border-t border-slate-200 flex justify-between text-xs text-slate-500">
          <span>Lead Clinician: Dr. Sarah Mitchell, PsyD</span>
          <span>Signature: [Verified Clinical Digital Signature]</span>
        </div>
      </div>
    </div>
  `;
}

// ------------------------------------------
// Admin Page 8: Centre Settings
// ------------------------------------------
function renderAdminSettings() {
  const a = store.state.admin;

  return `
    <div class="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <h1 class="text-2xl font-extrabold text-slate-900">Centre Configuration & Staff Directory</h1>
        <p class="text-xs text-slate-500">Clinical role-based access control and system audit logs.</p>
      </div>

      <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
        <h3 class="text-sm font-bold text-slate-900">HopePath Institution Profile</h3>
        <p class="text-xs text-slate-600">Facility: ${a.centreName}</p>
        <p class="text-xs text-slate-600">Lead Clinician: ${a.counsellorName}</p>
        <p class="text-xs text-slate-600">Audit Status: Fully HIPAA & 42 CFR Compliant</p>
      </div>
    </div>
  `;
}

// ==========================================
// 11. GLOBAL MODALS
// ==========================================

// Request Private Counsellor Follow-up Modal
function renderCounsellorModal() {
  return `
    <div id="counsellor-modal" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 hidden">
      <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-fade-in">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-slate-900">Request Counsellor Session</h3>
          <button onclick="closeCounsellorModal()" class="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <p class="text-xs text-slate-500 leading-relaxed">
          Dr. Sarah Mitchell will receive this private request directly in her clinical dashboard.
        </p>

        <form onsubmit="submitCounsellorRequest(event)" class="space-y-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Reason for consultation</label>
            <select id="counsel-reason" class="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-500">
              <option value="Urge Management & Craving Strategy">Urge Management & Craving Strategy</option>
              <option value="Medication & Sleep Guidance">Medication & Sleep Guidance</option>
              <option value="Family Stress & Relationship Support">Family Stress & Relationship Support</option>
              <option value="Upcoming Trigger Event / High-Risk Travel">Upcoming Trigger Event / High-Risk Travel</option>
              <option value="General Milestone Celebration">General Milestone Celebration</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Urgency Level</label>
            <select id="counsel-urgency" class="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-500">
              <option value="Standard">Standard (Within 24 hours)</option>
              <option value="Urgent">Urgent (Today / Next open slot)</option>
            </select>
          </div>

          <div class="flex justify-end gap-2 pt-3">
            <button type="button" onclick="closeCounsellorModal()" class="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs">
              Cancel
            </button>
            <button type="submit" class="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-teal">
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

// Shame-Free Reset Modal
function renderResetModal() {
  return `
    <div id="reset-modal" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 hidden">
      <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-fade-in">
        <div class="flex items-center gap-3">
          <span class="text-2xl">🌱</span>
          <h3 class="text-lg font-bold text-slate-900">Courageous Reset Flow</h3>
        </div>

        <p class="text-xs text-slate-600 leading-relaxed">
          Recovery is non-linear. You have <strong>NOT</strong> undone your 42 days of brain healing. Honesty here protects your long-term life.
        </p>

        <form onsubmit="confirmSupportiveReset(event)" class="space-y-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">What happened? (Private reflection)</label>
            <textarea id="reset-notes" rows="3" placeholder="What trigger occurred? What can we adjust in your routine to protect you next time?" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-500" required></textarea>
          </div>

          <div class="p-3 rounded-2xl bg-teal-50 border border-teal-100 text-[11px] text-teal-800">
            ✓ Dr. Mitchell will be notified with warmth and support, not judgment.
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button type="button" onclick="closeResetModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs">
              Cancel
            </button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-teal">
              Record Reset with Courage
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

// Register New Patient Modal (Admin)
function renderRegisterPatientModal() {
  return `
    <div id="register-patient-modal" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 hidden">
      <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-fade-in">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-slate-900">Register New Recovery Patient</h3>
          <button onclick="closeRegisterPatientModal()" class="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <form onsubmit="submitNewPatient(event)" class="space-y-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Full Patient Name</label>
            <input id="new-patient-name" type="text" placeholder="e.g. Taylor Smith" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-500" required>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Substance Recovery Focus</label>
            <input id="new-patient-substance" type="text" placeholder="e.g. Alcohol Recovery / Opioid MAT" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-500">
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Assigned Clinician</label>
            <select id="new-patient-counsellor" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-500">
              <option value="Dr. Sarah Mitchell">Dr. Sarah Mitchell, PsyD</option>
              <option value="Dr. Marcus Vance">Dr. Marcus Vance, LCSW</option>
              <option value="Elena Rostova">Elena Rostova, RDN</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Programme Duration</label>
            <select id="new-patient-duration" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-500">
              <option value="30">30 Days (Stabilization Track)</option>
              <option value="60">60 Days (Foundational Recovery)</option>
              <option value="90" selected>90 Days (Intensive IOP)</option>
              <option value="180">180 Days (Long-term Continuum)</option>
            </select>
          </div>

          <div class="flex justify-end gap-2 pt-3">
            <button type="button" onclick="closeRegisterPatientModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs">
              Cancel
            </button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-teal">
              Generate ID & Register
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

// Patient Details Modal (Admin Drilldown)
function renderPatientDetailModal() {
  return `
    <div id="patient-detail-modal" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 hidden">
      <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 animate-fade-in">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span id="p-detail-id" class="text-xs font-mono font-bold text-teal-700">RN-XXXX</span>
            <h3 id="p-detail-name" class="text-lg font-bold text-slate-900">Patient Name</h3>
          </div>
          <button onclick="closePatientDetailsModal()" class="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <div class="grid grid-cols-2 gap-3 text-xs">
          <div class="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span class="text-slate-400">Substance:</span>
            <div id="p-detail-substance" class="font-bold text-slate-800">Alcohol</div>
          </div>
          <div class="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span class="text-slate-400">Clinician:</span>
            <div id="p-detail-counsellor" class="font-bold text-slate-800">Dr. Mitchell</div>
          </div>
          <div class="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span class="text-slate-400">Streak:</span>
            <div id="p-detail-streak" class="font-bold text-teal-700">42 Days</div>
          </div>
          <div class="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span class="text-slate-400">Programme Duration:</span>
            <input id="p-detail-duration" type="number" class="w-full font-bold text-slate-900 border rounded px-1 py-0.5 mt-0.5 text-xs">
          </div>
        </div>

        <div class="p-3 rounded-2xl bg-teal-50 border border-teal-100 text-xs text-teal-800">
          Authorized staff may update programme timeline and clinical assignments.
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <button type="button" onclick="closePatientDetailsModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs">
            Close
          </button>
          <button type="button" onclick="savePatientDetailChanges()" class="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-teal">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  `;
}

// ------------------------------------------
// Footer
// ------------------------------------------
function renderFooter() {
  return `
    <footer class="mt-12 bg-white border-t border-slate-200/80 py-8 no-print">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div class="flex items-center gap-3">
          <div class="w-7 h-7 rounded-xl gradient-teal text-white flex items-center justify-center font-black text-xs">R</div>
          <span class="font-bold text-slate-700">RENEW – Rebuild Your Life</span>
          <span>•</span>
          <span class="italic">Every Day Sober. Every Step Stronger.</span>
        </div>
        <div class="flex items-center gap-4">
          <span>Confidentiality Protected under 42 CFR Part 2 & HIPAA</span>
          <span>•</span>
          <span>Emergency Support: 988 Lifeline</span>
        </div>
      </div>
    </footer>
  `;
}

// ==========================================
// 12. BOOTSTRAP APPLICATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});
