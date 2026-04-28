import type { Cartridge } from '../../types';

export const leaApps: Cartridge['apps'] = {
  wifi: [
    { name: 'Bbox-A45E2', locked: true, signal: 1 },
    { name: 'WiFi-de-Lea', locked: true, signal: 3 },
    { name: 'iPhone_de_Kevin', locked: true, signal: 2 },
  ],
  photos: {
    name: 'Léa',
    icon: '💝',
    phases: [
      {
        triggerStepIds: ['lea_rebus_setup'],
        photos: [
          { type: 'image', src: '/src/assets/photos/neighbor/footprints.jpg', alt: 'Traces de pas' },
          { type: 'image', src: '/src/assets/photos/neighbor/rice_bowl.jpg', alt: 'Riz' },
        ],
        notification: { title: 'Photos', message: 'Nouvel album partagé : Léa', icon: '🖼️' },
      },
      {
        triggerStepIds: ['filler_gps', 'mirror_challenge'],
        photos: [
          { type: 'postit', postitText: 'ENTRE' },
        ],
        notification: { title: 'Photos', message: 'Léa a ajouté une photo dans l\'album', icon: '🖼️' },
      },
      {
        triggerStepIds: ['victory_reward'],
        photos: [
          { type: 'image', src: '/src/assets/photos/neighbor/exclusive/morning.png', alt: 'Morning' },
          { type: 'image', src: '/src/assets/photos/neighbor/exclusive/gym.png', alt: 'Gym' },
          { type: 'image', src: '/src/assets/photos/neighbor/exclusive/beach_v1.png', alt: 'Beach' },
          { type: 'image', src: '/src/assets/photos/neighbor/exclusive/beach_back_v2.png', alt: 'Beach back' },
          { type: 'image', src: '/src/assets/photos/neighbor/exclusive/beach_silhouette.png', alt: 'Beach silhouette' },
          { type: 'image', src: '/src/assets/photos/neighbor/exclusive/showerv2.png', alt: 'Shower' },
        ],
        notification: { title: 'Photos', message: 'Léa a partagé des photos exclusives 🔥', icon: '🖼️' },
      },
    ],
  },
  maps: {
    coords: '48°51\'29" N, 2°17\'40" E',
    sharedBy: 'Léa',
  },
};

export const leaStartNotification = {
  title: 'Spark',
  message: 'Nouveau Match ! Léa vous a envoyé un message.',
  icon: '✨',
};
