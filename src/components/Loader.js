import React from 'react';
import ring from '../images/ring.svg';
import '../css/Loader.css';

const Loader = ({ children, loading }) => (
    <div>
        {
          loading ?
          (
            <div className="Loader">
                <img src={ring} alt="loading" className="Loading"/>
            </div>
          )
          : children
        }
    </div>
)

Loader.propTypes = {
  children: React.PropTypes.node,
  loading: React.PropTypes.bool
}
export default Loader;
