import React from "react";

const Store = ({ url }) => {

  // since the RAWG endpoint doesn't match up the store names to the links, return the name ourselves
  const whichStore = (link) => {
    let storeName;
    if (link.includes('store.steampowered.com')) {
      storeName = 'Steam Store';
    }
    else if (link.includes('marketplace.xbox.com')) {
      storeName = 'Xbox 360 Store';
    }
    else if (link.includes('microsoft.com')) {
      storeName = 'Xbox Store';
    }
    else if (link.includes('store.playstation.com')) {
      storeName = 'PlayStation Store';
    }
    else if (link.includes('gog.com')) {
      storeName = 'GOG';
    }
    else if (link.includes('apps.apple.com')) {
      storeName = 'Apple App Store';
    }
    else if (link.includes('play.google.com')) {
      storeName = 'Google Play Store';
    }
    else if (link.includes('nintendo.com')) {
      storeName = 'Nintendo Store';
    }
    else if (link.includes('epicgames.com')) {
      storeName = 'Epic Games Store';
    }
    else if (link.includes('itch.io')) {
      storeName = 'itch.io';
    }
    else {
      storeName = 'Other';
    }
    return storeName;
  }

  return (
    <p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {whichStore(url)}
      </a>
    </p>
  );
};


export default Store;