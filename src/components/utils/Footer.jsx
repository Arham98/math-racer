import React from 'react';
import PropTypes from 'prop-types';

export default function CustomFooter({ url }) {
  return (
    <footer className="page-footer footer-color">
      <div style={{
        fontSize: '20px', paddingLeft: '30px', paddingTop: '10px', paddingBottom: '40px',
      }}
      >
        {url
            && (
            <h5 style={{ color: 'white' }}>
              {'Backend Service URL: '}
              <a href={`${url}/items`} target="_blank" style={{ textDecoration: 'none', color: 'white' }} rel="noreferrer">
                {`${url}`}
              </a>
            </h5>
            )}
      </div>
    </footer>
  );
}

CustomFooter.propTypes = {
  url: PropTypes.string,
};

CustomFooter.defaultProps = {
  url: '',
};