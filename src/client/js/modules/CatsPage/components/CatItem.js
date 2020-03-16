import React, { Component } from "react";

export default class CatItem extends Component {
  render() {
    const { url, isRandomCatExist } = this.props;

    return (
      <div className={isRandomCatExist ? "cat cat--bigger" : "cat"}>
        <div className="cat__pic">
          <img src={url} alt="" />
        </div>
        <div className="cat__favourite">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z" />
          </svg>
        </div>
      </div>
    );
  }
}
