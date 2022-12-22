import { useState } from 'react';
import PropTypes from 'prop-types';
import React from 'react';

const INITIAL_FORM_DATA = {
  title: '',
  description: '',
};

const NewTaskForm = (props) => {
  const addTask = props.addTask;
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (e) => {
    console.log('Handle Change called: event data is', e);
    console.log('target name:', e.target.name);
    console.log('target value:', e.target.value);

    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);
  };

  const handleNewTaskSubmit = (e) => {
    e.preventDefault();
    console.log('form data:', formData);
    addTask(formData);
    setFormData(INITIAL_FORM_DATA);
  };

  return (
    <form onSubmit={handleNewTaskSubmit}>
      <label htmlFor="title">Task Title</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <input type="submit" value="Add Task" />
    </form>
  );
};

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
