import {
  Logoblack,
  Logowhite,
  clntkurikal,
    clntkmct1,
    clntimax,
    clntgava,
    clntkmct2,
    clntmywork,
    clntrowsandcolumns,
    clntkyma,
    clntdesigncore,
    clnteras1,
    clnthybiz,
    clntkasav,
    clntlivehi,
    clntkarims,
    clntshifa,
    clntgoodland,
    clntthreeseason,
    clntcresent,
    clntaroma,
    clntbeautalo,
    clntatelier,
    clntstackr,
    clntsaleemjavad,
    clntplumstory,
    clntjaas,
    clntessan,
    clntjezra,
    clntsacred,
    clntgeogrip,
    clnteogu,
    clntyaslin,
    clntzain,
    clntkans,
    clntf2f,
    clntkoti,
    clntomg,
    clntbuff,
    clntsysmantech,
    clntfixso,
    clntlubigen
} from '../../../public/images/index';


const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 18) {
      return "Good Afternoon";
    } else if(hour >= 18 && hour < 20){
      return "Good Evening";
    } else{
      return "Hello Night Stalker!";
    }
    
  };

export const banners=[
    {
        bgcolor: 'bg-black',
        logo:Logowhite,
        humberclr:'white',
        color: 'text-white',
        titles: [`${getGreeting()}`],
        duration: 2500, // in milliseconds
      },
      {
        bgcolor: 'bg-white',
        logo:Logoblack,
        humberclr:'black',
        color: 'text-black',
        titles: ["we are", "DO STUDIO"],
        duration: 1200,
      },
      {
        bgcolor: 'bg-black',
        logo:Logowhite,
        humberclr:'white',
        color: 'text-white',
        titles: ["we do", "BRANDING"],
        duration: 1200,
      },
      {
        bgcolor: 'bg-white',
        logo:Logoblack,
        humberclr:'black',
        color: 'text-black',
        titles: ["we do", "BRANDING"],
        duration: 1200,
      },
      {
        bgcolor: 'bg-black',
        logo:Logowhite,
        humberclr:'white',
        color: 'text-white',
        titles:  ["we do", "WEBSITES"],
        duration: 1200,
      },
      {
        bgcolor: 'bg-white',
        logo:Logoblack,
        humberclr:'black',
        color: 'text-black',
        titles: ["we do", "PHOTOSHOOTS"],
        duration: 1200,
      },
      {
        bgcolor: 'bg-black',
        logo:Logowhite,
        humberclr:'white',
        color: 'text-white',
        titles:  ["we do", "VIDEO PRODUCTION"],
        duration: 1200,
      },
      {
        bgcolor: 'bg-white',
        logo:Logoblack,
        humberclr:'black',
        color: 'text-black',
        titles: ["we do", "PACKAGE DESIGNS"],
        duration: 1200,
      },
      {
        bgcolor: 'bg-black',
        logo:Logowhite,
        humberclr:'white',
        color: 'text-white',
        titles: ["we do", "PRINT DESIGNS"],
        duration: 1200,
      },
      {
        bgcolor: 'bg-white',
        logo:Logoblack,
        humberclr:'black',
        color: 'text-black',
        titles: ["we do", "SOCIAL MEDIA"],
        duration: 1200,
      },
      {
        bgcolor: 'bg-black',
        logo:Logowhite,
        humberclr:'white',
        color: 'text-white',
        titles: ["we do", "GENUINE CLIENT", "RELATIONSHIPS"],
        duration: 1200,
      },
      {
        bgcolor: 'bg-white',
        logo:Logoblack,
        humberclr:'black',
        color: 'text-black',
        titles: ["we do", "COOL S**T"],
        duration: 1200,
      },
]


export const ClientsData=[
  {
    clt:clntkurikal
  },
  {
    clt:clntkmct1
  },
  {
    clt:clntimax
  },
  {
    clt:clntgava
  },
  {
    clt:clntkmct2
  },
  {
    clt:clntmywork
  },
  {
    clt:clntrowsandcolumns
  },
  {
    clt:clntkyma
  },
  {
    clt:clntdesigncore
  },
  {
    clt:clnteras1
  },
  {
    clt:clntfixso
  },
  {
    clt:clntbuff
  },
  {
    clt:clntlivehi
  },
  {
    clt:clntkarims
  },
  {
    clt:clntcresent
  },
  {
    clt:clntgoodland
  },
  {
    clt:clntthreeseason
  },
  {
    clt:clntshifa
  },
  {
    clt:clntaroma
  },
  {
    clt:clntbeautalo
  },
  {
    clt:clntatelier
  },
  {
    clt:clntstackr
  },
  {
    clt:clntsaleemjavad
  },
  {
    clt:clntplumstory
  },
  {
    clt:clntjaas
  },
  {
    clt:clntessan
  },
  {
    clt:clntjezra
  },
  {
    clt:clntsacred
  },
  {
    clt:clntgeogrip
  },
  {
    clt:clnteogu
  },
  {
    clt:clntyaslin
  },
  {
    clt:clntzain
  },
  {
    clt:clntkans
  },
  {
    clt:clntf2f
  },
  {
    clt:clntkoti
  },
  {
    clt:clntomg
  },
  {
    clt:clntkasav
  },
  {
    clt:clntsysmantech
  },
  {
    clt:clnthybiz
  },
  {
    clt:clntlubigen
  },
]


export const TestimonialData=[
  {
    name:`Haroon Rasheed`,
    design:`Founder of Mywork`,
    link:`https://mywork.company`,
    title:`Creative Marketing Agency In Calicut.`,
    descrption:`Do Studio is hands down the best creative marketing agency in Calicut. Their creativity and strategic approach
    have helped us achieve remarkable results in our marketing campaigns.`
  },
  {
    name:`Neshma Abdurrahman`,
    design:`Founder of Design Dialects`,
    link:`https://designdialects.com`,
    title:`Creative Marketing Agency in Calicut`,
    descrption:`Their out-of-the-box ideas and innovative campaigns have helped us stand out in a crowded market, generating significant brand awareness.Do Studio is a truly creative marketing agency in Calicut.`
  },
  {
    name:`MC Nasar`,
    design:`Chairman and Managing director of MCKKutty`,
    link:`https://mckkutty.com`,
    title:`Do Studio Is Good`,
    descrption:`Do Studio is good. They have consistently delivered exceptional designs and marketing solutions that have exceeded our expectations. We highly recommend their services.`
  },
  {
    name:`Arshad`,
    design:`Founder of Baleni`,
    link:`https://baleni.in`,
    title:`Dedicated Agency for marketing`,
    descrption:`Do Studio is a dedicated agency for marketing. They go above and beyond to understand our goals and objectives, delivering tailored solutions that have yielded fantastic results. Their commitment is truly commendable.`
  },
  {
    name:`Ar. Siraj`,
    design:`Founder and Chief Architect of Sacred Saga`,
    link:`https://sacred-saga.com`,
    title:`Professionals in advertising and Digital marketing`,
    descrption:`We have been working with Do Studio for our advertising and digital marketing needs, and they have consistently exceeded our expectations.`
  },
  {
    name:`Shanab`,
    design:`Founder of Plum stories`,
    link:`https://plumstories.com`,
    title:`Best Marketing Agency in Calicut`,
    descrption:`Do studio is one of Calicut's best marketing agency. Engaging with such positive and skilled people has been a beautiful experience.`
  },
]