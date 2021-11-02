import { MediaServerResponse } from '../../types';

export const MediaResponseMock: MediaServerResponse = {
  page: 1,
  results: [
    {
      backdrop_path: '/bVUiZVA8iPwdEc0lX5nwEr6MwdM.jpg',
      first_air_date: '2021-09-03',
      genre_ids: [99],
      id: 132719,
      name: 'Money Heist: From Tokyo to Berlin',
      origin_country: ['ES'],
      original_language: 'es',
      original_name: 'La Casa de Papel: de Tokio a Berlín',
      overview:
        'The filmmakers and actors behind "Money Heist" characters like Tokyo and the Professor talk about the emotional artistic process of filming the series.',
      popularity: 220.43,
      poster_path: '/g0wLsOFpvK5nX5hsIAwXHrpnFLI.jpg',
      vote_average: 7.7,
      vote_count: 9,
    },
    {
      backdrop_path: '/wAEWZm2pSopAbqE5dQWE0ET8aR5.jpg',
      first_air_date: '2021-01-08',
      genre_ids: [10759, 10765, 99],
      id: 114695,
      name: 'Marvel Studios: Legends',
      origin_country: ['US'],
      original_language: 'en',
      original_name: 'Marvel Studios: Legends',
      overview:
        'Revisit the epic heroes, villains and moments from across the MCU in preparation for the stories still to come. Each dynamic segment feeds directly into the upcoming series — setting the stage for future events. This series weaves together the many threads that constitute the unparalleled Marvel Cinematic Universe.',
      popularity: 174.731,
      poster_path: '/EpDuYIK81YtCUT3gH2JDpyj8Qk.jpg',
      vote_average: 7.6,
      vote_count: 484,
    },
  ],
  total_pages: 20,
  total_results: 200,
};

export const MediaResponseSearchMock: MediaServerResponse = {
  page: 1,
  results: [
    {
      backdrop_path: '/epQEpsbNHrEe76oSI42TOwHKOLF.jpg',
      first_air_date: '2021-02-24',
      genre_ids: [99, 10768],
      id: 93736,
      name: 'Age of Samurai: Battle for Japan',
      origin_country: ['US'],
      original_language: 'en',
      original_name: 'Age of Samurai: Battle for Japan',
      overview:
        'Dynamic reenactments and expert commentaries bring to life the tumultuous history and power struggles of a warring 16th-century feudal Japan.',
      popularity: 46.419,
      poster_path: '/wIKQRtc2kKiBmBnkOjjvMqIDfah.jpg',
      vote_average: 7.1,
      vote_count: 211,
    },
    {
      backdrop_path: '/41ZBU34r8WqCBSczUzL7SMQAgX3.jpg',
      first_air_date: '2021-02-10',
      genre_ids: [99, 80, 9648],
      id: 116989,
      name: 'Crime Scene: The Vanishing at the Cecil Hotel',
      origin_country: ['US'],
      original_language: 'en',
      original_name: 'Crime Scene: The Vanishing at the Cecil Hotel',
      overview:
        "The notorious Cecil Hotel grows in infamy when guest Elisa Lam vanishes. A dive into crime's darkest places.",
      popularity: 45.177,
      poster_path: '/2JECBiHk8U8PIhswVd3Pthc13tG.jpg',
      vote_average: 7.3,
      vote_count: 212,
    },
    {
      backdrop_path: '/AhcPiOviZ36mE5DjkX3aI9zIQJ9.jpg',
      first_air_date: '2002-10-21',
      genre_ids: [99],
      id: 45,
      name: 'Top Gear',
      origin_country: ['GB'],
      original_language: 'en',
      original_name: 'Top Gear',
      overview:
        'This fast-paced and stunt-filled motor show tests whether cars, both mundane and extraordinary, live up to their manufacturers\' claims. The long-running show travels to locations around the world, performing extreme stunts and challenges to see what the featured cars are capable of doing. The current hosts are Paddy Mcguinness, Chris Harris and Andrew "Freddie" Flintoff.',
      popularity: 45.034,
      poster_path: '/aqM6QnuhSXzjHlKbXyKUqxaGiWu.jpg',
      vote_average: 7.4,
      vote_count: 488,
    },
  ],
  total_pages: 30,
  total_results: 300,
};
