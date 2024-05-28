"use client"
import { useRouter, useParams } from 'next/navigation';
import {ServiceData} from '../../../components/constant/data';

const ServicePage =  () => {
  const router = useRouter(); // Initializing the useRouter hook
  const title  = router.query; // Accessing the 'title' parameter from the router query

  // Finding the service data based on the 'id' parameter
  const servicedata = ServiceData.find((s) => s.id === title);

  // Checking if the service data is not found
  if (!servicedata) {
    return <div>Service not found</div>;
  }
  return (
    <div className="pt-40">
      <h1>{servicedata.title}</h1>
      <p>{servicedata.shrtdesc}</p>
      <p>{servicedata.id}</p>
    </div>
  );
};

export default ServicePage;