/**
 * Created by neo on 15/12/15.
 */
import React from 'react';
import Lightbox from './Lightbox.js';
import './styles/style.css';
import Icon from 'react-fa';
import objectAssign from 'object-assign';

var Gallery = React.createClass({
  displayName: 'Gallery',
  propTypes: {
    images: React.PropTypes.array,
    heading: React.PropTypes.string,
    subheading: React.PropTypes.string,
    sepia: React.PropTypes.bool,
  },
  getInitialState () {
    return {
      lightboxIsOpen: false,
      currentImage: 0,
    };
  },
  openLightbox (index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  },
  closeLightbox () {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  },
  gotoPrevious () {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  },
  gotoNext () {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  },
  handleDelete(obj){
    this.props.onImageRemove(obj);
  },
  renderGallery () {
    if (!this.props.images) return;
    let gallery = this.props.images.map((obj, i) => {
      return (
        <li key={i} className="image-list-item">
          <a href={obj.src} onClick={(event) => this.openLightbox(i, event)}
             style={objectAssign({}, styles.thumbnail)}>
            <img src={obj.src} width={styles.thumbnail.size} height={styles.thumbnail.size}/>
          </a>
          {this.props.onImageRemove ?
            <div className="image-del"><span onClick={this.handleDelete.bind(this, obj)}><Icon name="times"/></span>
            </div> : null}
        </li>
      );
    });

    return (
      <div style={styles.gallery}>
        <ul className="image-list-group">
          {gallery}
        </ul>
      </div>
    );
  },
  render () {
    return (
      <div className="section">
        {this.props.heading && <h2>{this.props.heading}</h2>}
        {this.props.subheading && <p>{this.props.subheading}</p>}
        {this.renderGallery()}
        <Lightbox
          currentImage={this.state.currentImage}
          images={this.props.images}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
          styles={this.props.styles}
          width={1200}
        />
      </div>
    );
  }
});

const THUMBNAIL_SIZE = 120;

const styles = {
  gallery: {
    marginLeft: -5,
    marginRight: -5,
    overflow: 'hidden',
  },
  thumbnail: {
    backgroundSize: 'cover',
    borderRadius: 3,
    float: 'left',
    height: 'auto',
    overflow: 'hidden',
    width: THUMBNAIL_SIZE,
  },
  thumbnailImage: {
    display: 'block',
    height: 'auto',
    left: '50%',
    position: 'relative',

    WebkitTransform: 'translateX(-50%)',
    MozTransform: 'translateX(-50%)',
    msTransform: 'translateX(-50%)',
    transform: 'translateX(-50%)',
  },
};

module.exports = Gallery;
