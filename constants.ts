import { BlogPost } from './types';

export const CATEGORIES = ['World News', 'Breaking Events', 'Movies', 'Series', 'Anime', 'Reviews'];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Global Summit 2024: Leaders Agree on New Climate Action Plan',
    excerpt: 'In a historic turn of events, world leaders have unanimously agreed to accelerate carbon neutrality goals by 2030.',
    content: 'Full coverage of the Global Summit 2024. Leaders from 195 nations gathered in Geneva to discuss the pressing issues of climate change. The agreement outlines strict penalties for non-compliance and creates a global fund for green energy transition. Critics argue it might be too ambitious, but proponents say it is necessary for survival.',
    category: 'World News',
    author: 'Sarah Jenkins',
    date: '2024-05-15',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    tags: ['Climate', 'Politics', 'Summit'],
    featured: true,
    views: 12500
  },
  {
    id: '2',
    title: 'Breaking: Major Earthquake Strikes Pacific Rim',
    excerpt: 'A magnitude 7.8 earthquake has been reported off the coast. Tsunami warnings are in effect.',
    content: 'Emergency services are responding to a massive earthquake in the Pacific Rim. Early reports suggest significant structural damage in coastal cities. Authorities are urging residents to move to higher ground immediately. International aid is being mobilized.',
    category: 'Breaking Events',
    author: 'Mark Rutherford',
    date: '2024-05-16',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    tags: ['Disaster', 'Earthquake', 'Breaking'],
    featured: true,
    views: 45000
  },
  {
    id: '3',
    title: 'Review: "Starlight Odyssey" Redefines Sci-Fi Cinema',
    excerpt: 'The latest blockbuster from director J.K. Vance is a visual masterpiece that demands to be seen on the biggest screen possible.',
    content: 'Starlight Odyssey takes us on a journey to the edge of the universe. With groundbreaking VFX and a heart-wrenching story about survival and family, it sets a new bar for the genre. The performance by the lead actor is Oscar-worthy.',
    category: 'Movies',
    author: 'Emily Chen',
    date: '2024-05-14',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    tags: ['Sci-Fi', 'Review', 'Cinema'],
    featured: false,
    views: 8900
  },
  {
    id: '4',
    title: 'Anime Update: "Demon Hunter" Season 4 Announced',
    excerpt: 'Fans rejoice as the studio confirms the production of the highly anticipated arc.',
    content: 'After a two-year hiatus, Demon Hunter is returning. The studio released a teaser trailer today showing the new villains and upgraded animation style. Release date is set for Fall 2024.',
    category: 'Anime',
    author: 'Kenji Sato',
    date: '2024-05-12',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    tags: ['Anime', 'Announcement', 'Season 4'],
    featured: false,
    views: 32000
  },
  {
    id: '5',
    title: 'The Rise of Indie Games in 2024',
    excerpt: 'Small studios are making big waves this year with innovative gameplay mechanics.',
    content: 'We take a look at the top 10 indie games released this year that are outperforming AAA titles. From pixel art platformers to deep narrative RPGs, creativity is flourishing.',
    category: 'Reviews',
    author: 'Alex Gamer',
    date: '2024-05-10',
    imageUrl: 'https://picsum.photos/800/600?random=5',
    tags: ['Gaming', 'Indie', 'Tech'],
    featured: false,
    views: 5600
  },
  {
    id: '6',
    title: 'Series Finale: "The Crowned King" Leaves Fans Divided',
    excerpt: 'The shocking conclusion to the fantasy epic has ignited a firestorm on social media.',
    content: 'Spoilers ahead! The finale of The Crowned King took a dark turn that many did not see coming. While some praise the boldness, others feel it betrayed the character arcs built over 8 seasons.',
    category: 'Series',
    author: 'Jessica Moore',
    date: '2024-05-13',
    imageUrl: 'https://picsum.photos/800/600?random=6',
    tags: ['TV', 'Fantasy', 'Finale'],
    featured: true,
    views: 150000
  },
  {
    id: '7',
    title: 'Cyberpunk Edgerunners: A Revival of the Genre',
    excerpt: 'How one show brought a massive player base back to the game and revitalized the cyberpunk aesthetic.',
    content: 'An analysis of visual storytelling and its impact on gaming culture.',
    category: 'Anime',
    author: 'Kenji Sato',
    date: '2024-05-18',
    imageUrl: 'https://picsum.photos/800/600?random=7',
    tags: ['Anime', 'Cyberpunk', 'Netflix'],
    featured: true,
    views: 25000
  },
  {
    id: '8',
    title: 'Mars Colonization: SpaceX Reveals New Rocket',
    excerpt: 'Elon Musk unveils the Starship V3, promising affordable travel to the Red Planet by 2030.',
    content: 'The new design features larger cargo capacity and faster refueling times.',
    category: 'World News',
    author: 'Sarah Jenkins',
    date: '2024-05-19',
    imageUrl: 'https://picsum.photos/800/600?random=8',
    tags: ['Space', 'Tech', 'Mars'],
    featured: true,
    views: 18000
  },
  {
    id: '9',
    title: 'Blockbuster Season: Top 5 Movies to Watch This Summer',
    excerpt: 'From superhero epics to quiet dramas, here is your guide to the summer cinema.',
    content: 'Get your popcorn ready, this summer lineup is stacked.',
    category: 'Movies',
    author: 'Emily Chen',
    date: '2024-05-20',
    imageUrl: 'https://picsum.photos/800/600?random=9',
    tags: ['Movies', 'Summer', 'List'],
    featured: false,
    views: 7500
  }
];
