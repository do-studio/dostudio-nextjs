import {
  Logoblack,
  Logowhite
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