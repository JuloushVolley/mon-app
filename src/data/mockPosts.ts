export type Post = {
  id: number;
  username: string;
  handle: string;
  content: string;
  avatar: string;
  time: string;
  image?: string;
};

export const initialPosts: Post[] = [
  {
    id: 1,
    username: "Alice Martin",
    handle: "alice",
    content:
      "Premier test de la journée avec #react et #ionic pour une app mobile propre.",
    avatar: "https://ionicframework.com/docs/img/demos/avatar.svg",
    time: "2m",
  },
  {
    id: 2,
    username: "Nicolas",
    handle: "nico",
    content: "Je travaille sur le design du feed avec #ui et #mobile.",
    avatar: "https://ionicframework.com/docs/img/demos/avatar.svg",
    time: "5m",
  },
  {
    id: 3,
    username: "Sarah",
    handle: "sarahdev",
    content:
      "Bonne session code ce matin, beaucoup de progrès sur #typescript et #frontend.",
    avatar: "https://ionicframework.com/docs/img/demos/avatar.svg",
    time: "8m",
  },
  {
    id: 4,
    username: "Yanis",
    handle: "yanis",
    content: "Nouvelle fonctionnalité validée avec #search et #hashtags.",
    avatar: "https://ionicframework.com/docs/img/demos/avatar.svg",
    time: "12m",
  },
  {
    id: 5,
    username: "Emma",
    handle: "emma",
    content:
      "Prototype terminé, il reste juste la finition de #css et #animation.",
    avatar: "https://ionicframework.com/docs/img/demos/avatar.svg",
    time: "18m",
  },
  {
    id: 6,
    username: "Lucas",
    handle: "lucaspro",
    content:
      "J’aime bien le rendu final du composant post avec #preview et #photo.",
    avatar: "https://ionicframework.com/docs/img/demos/avatar.svg",
    time: "21m",
  },
  {
    id: 7,
    username: "Clara",
    handle: "clara",
    content: "On ajoute une recherche par #tag et un tri par #popularité.",
    avatar: "https://ionicframework.com/docs/img/demos/avatar.svg",
    time: "26m",
  },
  {
    id: 8,
    username: "Hugo",
    handle: "hugo",
    content: "Tests terminés, tout passe bien sur #android et #build.",
    avatar: "https://ionicframework.com/docs/img/demos/avatar.svg",
    time: "30m",
  },
  {
    id: 9,
    username: "Maya",
    handle: "maya",
    content:
      "Je poste une image locale pour tester le flux avec #image et #upload.",
    avatar: "https://ionicframework.com/docs/img/demos/avatar.svg",
    time: "35m",
  },
  {
    id: 10,
    username: "Paul",
    handle: "paul",
    content:
      "Dernier post de la liste avec #demo et #release pour la démo finale.",
    avatar: "https://ionicframework.com/docs/img/demos/avatar.svg",
    time: "40m",
  },
];
