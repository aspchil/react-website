import React from "react";

export const docId = 'uUZU7oJjBWTtcslJRmt1';

export const isValidEmail = email => {
  try {
    const regex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    return email.match(regex) ? true : false;
  } catch (e) {
    return false;
  }
};

export const LinkRenderer = (props) => {
    return (
      <a href={props.href} target="_blank" rel="noreferrer">
        {props.children}
      </a>
    );
  }

 export const updateImmutable = (list, payload) => {
    const data = list.find((d) => d._id === payload._id);
    if (data) {
      const index = list.findIndex((d) => d._id === payload._id);
  
      return [
        ...list.slice(0, index),
        { ...data, ...payload },
        ...list.slice(index + 1)
      ];
    }
    return list;
  };

export const listToMatrix = (list, elementsPerSubArray) => {
    const matrix = [];
    let i, k;
    for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
        k++;
        matrix[k] = [];
      }
      matrix[k].push(list[i]);
    }
    return matrix;
  };

export const formatTime = (inpDate) => {
    const date = new Date(inpDate);
    let now = new Date();        
    const oneDay = 60 * 60 * 24 * 1000;
    const compareDatesBoolean = (now - date) > oneDay;
    if(compareDatesBoolean){

        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        
        if(((new Date()) - date) / (1000 * 3600 * 24 * 365) > 1){
            return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        }else{
            return `${months[date.getMonth()]} ${date.getDate()} at ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
        }

    }else{
        return processTime(date);
    }
  }

  export const processTime = (date) => {
    const formatter = new Intl.RelativeTimeFormat('en');
    const ranges = {
      years: 3600 * 24 * 365,
      months: 3600 * 24 * 30,
      weeks: 3600 * 24 * 7,
      days: 3600 * 24,
      hours: 3600,
      minutes: 60,
      seconds: 1
    };
    const secondsElapsed = (date.getTime() - Date.now()) / 1000;
    for (let key in ranges) {
      if (ranges[key] < Math.abs(secondsElapsed)) {
        const delta = secondsElapsed / ranges[key];
        return formatter.format(Math.round(delta), key);
      }
    }
    return 'few seconds ago';
  }


 export const isValidUrl = (url) => {
    const urlRegex = /^(https?:\/\/)/;
    return urlRegex.test(url);
  }

  export const getSentenceFromCamelCase = (message) => {
    let pattern = /[A-Za-z]/g;
    let messages = message.match(pattern);
    let errorMessage = "";
    for (let i = 0; i < messages.length; i++) {
      errorMessage +=
        messages[i] === messages[i].toUpperCase()
          ? " " + messages[i].toLowerCase()
          : messages[i];
    }
    return (errorMessage[0].toUpperCase() + errorMessage.slice(1)).trim();
  };

  export const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };
  
  export const getRegExp = (type) => {
    let regex = null;
    switch (type) {
      case "email":
        regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g;
        break;
      case "number":
        regex = /^[0-9]*$/;
        break;
      case "password":
        regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        break;
      default:
        break;
    }
    return regex;
  };
  
  export const checkValidation = (errors, data) => {
    const finalErrors = {};
    Object.keys(data).forEach((key) => {
      if (!data[key]) {
        finalErrors[key] = `${getSentenceFromCamelCase(key)} is required.`;
      }
    });
    Object.keys(errors).forEach((key) => {
      if (errors[key] !== "") {
        finalErrors[key] = errors[key];
      }
    });
    return finalErrors;
  };
  
