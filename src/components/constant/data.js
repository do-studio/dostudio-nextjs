import {
  Logoblack,
  Logowhite,
  clntkurikal,
    clntkmct1,
    clntztart,
    clntpk,
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
    clntlubigen,
    clntimamom,
    clntarooha,
    clnttandt,
    clntcapind,
    clntasten,
    clntonecity,
    clntklum,
    clntlulu
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
    clt:clntlulu
  },
  {
    clt:clntpk
  },
  {
    clt:clntasten
  },
  {
    clt:clntonecity
  },
  {
    clt:clntkmct1
  },
  {
    clt:clntkurikal
  },
  {
    clt:clnttandt
  },
  {
    clt:clntgava
  },
  {
    clt:clntklum
  },
  {
    clt:clntcresent
  },
  {
    clt:clntcapind
  },
  {
    clt:clntkmct2
  },
  {
    clt:clntztart
  },
  {
    clt:clntplumstory
  },
  
  {
    clt:clnteras1
  },
  {
    clt:clntf2f
  },
  {
    clt:clntstackr
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

export const ServiceData=[
  {
    id:1,
    slug:`branding`,
    title:`branding`,
    shrtdesc:`In the heart of Calicut's thriving business scene, where innovation meets
    tradition, one agency stands as the authority on crafting brand identities
    that inspire, engage, and succeed. Welcome to Do Studio Calicut, the
    definitive branding agency in this vibrant city.`,
    innerPage:``
  },
  {
    id:2,
    slug:`digital-marketing`,
    title:`digital marketing`,
    shrtdesc:`In the heart of Calicut's vibrant business ecosystem, where tradition
    harmonizes with innovation, stands a creative and digital marketing agency
    that is rewriting the rules of brand engagement — Do Studio Calicut.`,
    innerPage:``
  },
  {
    id:3,
    slug:`web-design`,
    title:`web design`,
    shrtdesc:`In the digital age, your online presence is often the first impression potential
    customers have of your brand. At Do Studio, we understand the vital role
    that web design plays in shaping that impression.`,
    innerPage:``
  },
  {
    id:4,
    slug:`package-design`,
    title:`package design`,
    shrtdesc:`In the fast-paced and visually driven world of modern consumerism, your
    product's packaging design is not just a protective shell; it's your brand's first
    impression, a silent salesperson, and a storyteller all rolled into one.`,
    innerPage:``
  },
  {
    id:5,
    slug:`print-design`,
    title:`print design`,
    shrtdesc:`In the digital age, where screens dominate our lives, the tangible, sensory
    experience of printed materials still holds a special place in the hearts of
    consumers.`,
    innerPage:``
  },
  {
    id:6,
    slug:`photoshoot`,
    title:`photoshoot`,
    shrtdesc:`In the fast-paced world of advertising and design, visual content reigns
    supreme. The old adage "a picture is worth a thousand words" couldn't be
    more relevant today.`,
    innerPage:``
  },
]