import { Home, PieChart, Users, User } from 'react-feather'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faScaleBalanced, faChartLine, faTicket, faQuestion, faEnvelopesBulk, faCircleInfo, faUserGear } from '@fortawesome/free-solid-svg-icons'

export default [
  {
    header: "Acceuil"
  },
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'support',
    title: 'Support',
    icon: <FontAwesomeIcon icon={faCircleInfo} />,
    navLink: '/support'
  },
  {
    header: "Gestion des Utilisateurs"
  },
  {
    id: 'users',
    title: 'Utilisateurs',
    icon: <Users size={20} />,
    navLink: '/users'
  },
  {
    id: 'clients',
    title: 'Clients',
    icon: <User size={20}/>,
    navLink: '/users/client'
  },
  {
    id: 'lp',
    title: 'Consultants juridique',
    icon: <FontAwesomeIcon icon={faScaleBalanced} />,
    navLink: '/users/lp'
  },
  {
    id: 'admin',
    title: 'Admins',
    icon: <FontAwesomeIcon icon={faUserGear}/>,
    navLink: '/users/admin'
  },
  {
    header: "Gestion des Tickets"
  },
  {
    id: 'questions',
    title: 'Questions',
    icon: <FontAwesomeIcon icon={faQuestion}/>,
    navLink: '/questions'
  },
  {
    id: 'tickets',
    title: 'Tickets',
    icon: <FontAwesomeIcon icon={faTicket} />,
    navLink: '/tickets'
  },
  {
    header: "Gestion des postes et categories"
  },
  {
    id: 'posts',
    title: 'Posts',
    icon: <FontAwesomeIcon icon={faEnvelopesBulk} />,
    navLink: '/posts'
  },
  {
    id: 'cateogories',
    title: 'Categories',
    icon: <FontAwesomeIcon icon={faEnvelopesBulk} />,
    navLink: '/categories'
  },
  {
    header: "Statistiques"
  },
  {
    id: 'UsersStats',
    title: 'Audience',
    icon: <FontAwesomeIcon icon={faChartLine}/>,
    navLink: '/stats/audience'
  },
  {
    id: 'QuestionsStats',
    title: 'les Questions',
    icon: <PieChart size={20} />,
    navLink: '/stats/questions'
  }
]
