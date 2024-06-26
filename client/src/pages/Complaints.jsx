import { useSelector } from 'react-redux';
import React, { useState, useRef, useEffect } from "react";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';
import { app } from '../firebase';
import { Box } from "@mui/material";
import ComplaintsPieChart from '../components/Chart';
import BarChart from '../components/barChart';
import ProChart from '../components/proChart';
import { Card, CardContent, Typography, Button } from '@mui/material';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function EmailForm() {

  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [complaint, setComplaint] = useState('');
  const [category, setCategory] = useState('');
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [link,setLink] = useState('www.google.com');

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
    console.log(currentUser);
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setLink(downloadURL)
        );
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      uuid: currentUser.uuid,
      complaint,
      title,
      complaint_proof: link,
      issue_category: category
    };

    try {
      const response = await fetch("https://mini-project-fo4m.onrender.com/api/complaint/addcomplaint", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
      });

      if (!response.ok) {
          throw new Error("Failed to submit complaint.");
      }

      console.log("Complaint submitted successfully!");
    } catch (error) {
      console.error("Error submitting complaint:", error.message);
    }
  };

  const chartStyle = {
    height: '60vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const isAdmin = currentUser.username === 'ramangoudanh'; 

  return (
    <div>
      {isAdmin ? (
         <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
         <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '20px' }}>
           Analytics
         </Typography>
         <Slider ref={sliderRef} {...settings} style={{ width: '90%' }}>
           <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center' }} title="Hover to see the count">
             <Card variant="outlined" style={{ marginBottom: '20px', width: '100%' }}>
               <CardContent>
                 <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
                   Complaints Pie Chart
                 </Typography>
                 <div style={chartStyle}>
                   <BarChart />
                 </div>
               </CardContent>
             </Card>
           </div>
           <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center' }} title="Hover to see the count">
             <Card variant="outlined" style={{ width: '100%' }}>
               <CardContent>
                 <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
                   Bar Chart
                 </Typography>
                 <div style={chartStyle}>
                   <ProChart />
                 </div>
               </CardContent>
             </Card>
           </div>
           <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center' }} title="Hover to see the count">
             <Card variant="outlined" style={{ width: '100%' }}>
               <CardContent>
                 <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
                   My Responsive Pie Chart
                 </Typography>
                 <div style={chartStyle}>
                   <ComplaintsPieChart />
                 </div>
               </CardContent>
             </Card>
           </div>
         </Slider>
         <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', marginTop: '20px' }}>
           <Button variant="contained" color="primary" onClick={handlePrev}>Previous</Button>
           <span>hover to see Details</span>
           <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
         </div>
       </div>
      ) : (
        <div className="max-w-md mt-5 mx-auto bg-blue-100 shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Compose Email</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="title"
                  id="title"
                  className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  placeholder="Enter title of complaint"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  id="category"
                  className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Technical">Technical</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Billing">Billing</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="complaint" className="block text-sm font-medium text-gray-700 mb-1">Complaint</label>
                <textarea
                  id="complaint"
                  className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  rows="4"
                  placeholder="Enter your complaint"
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type='file'
                  ref={fileRef}
                  accept='image/*'
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Send Email</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
