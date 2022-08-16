import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

const Third = ({formData, setFormData}) => {

  const [image, setImage] = useState('')

  // useEffect( () => {
    
  //   const { data, error } = await supabase.storage
  //     .from("avatars")
  //     .upload(`${Date.now()}_${image.name}`, image);
  //     if (error) {
  //     console.log(error);
  //   }

  //   if (data) {
  //     setImage(data.Key);
  //   }
  // },[image]);

  return (
    <div>
      <h2>Tell me about yourself.</h2>

      {/* <div className="form-group">
        <label htmlFor="avatar">Choose Avatar:</label>
        <img
          className="pfp"
          src={`https://yvjzibmcgvuhvzzulirq.supabase.co/storage/v1/object/public/${image}`}
          width={200}
          alt=""
        />
        <input
          type="file"
          accept={"image/jpeg image/png"}
          onChange={(e) => {
            setFormData(e.target.files[0])
            setImage(e.target.files[0])
            }
          }
        />
      </div> */}

      <div className="form-group">
          <label htmlFor="name">Display name:</label>
          <br />
          <input
            className="textField"
            type="text"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            value={formData.name}
          />
        </div>

        <div className="form-group">
          <label htmlFor="industry">Biography:</label>
          <br />
          <textarea
            className="textbox"
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            value={formData.bio}
          />
        </div>

        <div className="form-group">
          <label htmlFor="website">Website:</label>
          <br />
          <input
            className="textField"
            type="text"
            onChange={(e) => setFormData({...formData, website: e.target.value})}
            value={formData.website}
          />
        </div>

    </div>
  );
};

export default Third;
