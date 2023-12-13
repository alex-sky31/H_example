import React from 'react';
import './Modal.css';
import { Formik, Field, Form } from 'formik';
import locationService from '../../API/locations/Locations.service';
import { Location } from '../../API/locations/Location.entity';
import * as Yup from 'yup';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: number;
}
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().min(1, 'Price must be a positive number').required('Price is required'),
  stars: Yup.number().min(1, 'Stars must be a non-negative number').required('Stars are required'),
  numberOfRooms: Yup.number()
    .min(1, 'Number of rooms must be a non-negative number')
    .required('Number of rooms is required'),
  location: Yup.string().required('Location is required')
});

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, categoryId }) => {
  const submit = async (values: Partial<Location>) => {
    const location = {
      ...values,
      id: Math.floor(Math.random() * 9999999999999),
      categoryId,
      picture: 'https://cdn.pixabay.com/photo/2012/11/21/10/24/building-66789_1280.jpg'
    };
    try {
      await locationService.createLocation(location);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <Formik
              initialValues={{
                title: '',
                description: '',
                price: 0,
                numberOfRooms: 0,
                location: '',
                stars: 0
              }}
              validationSchema={validationSchema}
              onSubmit={submit}>
              {({ errors, touched }) => (
                <Form className="form-content">
                  <label htmlFor="title">Title</label>
                  <Field id="title" name="title" placeholder="Jane" />
                  {touched.title && errors.title && <span className="error">{errors.title}</span>}
                  <label htmlFor="description">description</label>
                  <Field id="description" name="description" placeholder="Doe" />
                  {touched.description && errors.description && (
                    <span className="error">{errors.description}</span>
                  )}
                  <label htmlFor="price">price</label>
                  <Field id="price" name="price" placeholder="Doe" type="number" />
                  {touched.price && errors.price && <span className="error">{errors.price}</span>}
                  <label htmlFor="price">stars</label>
                  <Field id="stars" name="stars" placeholder="0" type="number" />
                  {touched.stars && errors.stars && <span className="error">{errors.stars}</span>}
                  <label htmlFor="numberOfRooms">numberOfRooms</label>
                  <Field id="numberOfRooms" name="numberOfRooms" placeholder="Doe" type="number" />
                  {touched.numberOfRooms && errors.numberOfRooms && (
                    <span className="error">{errors.numberOfRooms}</span>
                  )}
                  <label htmlFor="location">Location</label>
                  <Field id="location" name="location" placeholder="do" />
                  {touched.location && errors.location && (
                    <span className="error">{errors.location}</span>
                  )}
                  <div className="form-footer">
                    <button className="close-button" onClick={onClose}>
                      Close
                    </button>
                    <button className="submit-button" type="submit">
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
