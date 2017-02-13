import React from 'react'
import {Link} from 'react-router'

import config from './config.json';

const apps = config['internal'];
const projects = config['projects'];
const training = config['training'];
export const Content = () => (
  <div className="ui two column grid container">
    <div className="column">
      <div className="ui raised segment">
        <label className="ui blue ribbon label"><i className="cubes icon"/>Engine Kernel Apps</label>
        <div className="ui secondary vertical menu">
          {
            apps.map((item) => (<Link className="link item" to={item['route']} key={item['name']}>
              {item['text']}
            </Link>))
          }
        </div>
      </div>
      <div className="ui raised segment">
        <label className="ui red ribbon label"><i className="student icon"/>Training Apps</label>
        <div className="ui secondary vertical menu">
          {
            training.map((item) => (
              <Link className="link item" to={item['route']} key={item['name']}>{item['text']}</Link>))
          }
        </div>
      </div>
    </div>
    <div className="column">
      <div className="ui segment">
        <label className="ui teal right ribbon label"><i className="plug icon"/>Projects List</label>
        <div className="ui secondary vertical right menu">
          {
            projects.map((item) => (
              <Link className="link item" to={item['route']} key={item['name']}>{item['text']}</Link>))
          }
        </div>
      </div>
    </div>
  </div>
)

export default {
  component: Content
};
