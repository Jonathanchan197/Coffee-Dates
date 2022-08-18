const Third = ({ formData, setFormData }) => {
  return (
    <div className="third">
      <h2 className="bounce" >Tell me about yourself.</h2>

      <div className="form-group">
        <label htmlFor="avatar">Choose Avatar</label>
        <br />
        {/* {formData.avatarUrl !== "" ? (
          <img
            className="pfp"
            src={`https://yvjzibmcgvuhvzzulirq.supabase.co/storage/v1/object/public/${formData.image}`}
            width={200}
            alt=""
          />
        ) : (
          "No avatar set."
        )} */}
        <input
          type="file"
          accept={"image/jpeg image/png"}
          onChange={(e) => {
            setFormData({ ...formData, image: e.target.files[0] });
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Display name</label>
        <br />
        <input
          className="textField"
          type="text"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          value={formData.name}
        />
      </div>

      <div className="form-group">
        <label htmlFor="industry">Biography</label>
        <br />
        <textarea
          className="textbox"
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          value={formData.bio}
        />
      </div>

      <div className="form-group">
        <label htmlFor="website">Website</label>
        <br />
        <input
          className="textField"
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, website: e.target.value })
          }
          value={formData.website}
        />
      </div>
    </div>
  );
};

export default Third;
