import React, { useState } from 'react';
import './index.css';
import { ReplyIcon, RetweetIcon, LikeIcon, ShareIcon } from './icons.js';

export default function App() {
  const [fullName, setFullname] = useState('Name Surname');
  const [userName, setUsername] = useState('username');
  const [content, setContent] = useState(
    'It is an @example #content http://www.for.com your fake tweet... Hello world! New line...'
  );
  const [image, setImage] = useState();
  const [retweet, setRetweet] = useState(0);
  const [quoteTweet, setQuotetweet] = useState(0);
  const [like, setLike] = useState(0);

  const tweetFormat = tweet => {
    tweet = tweet
      .replace(/@([\w]+)/g, '<span class="text-blue-400">@$1</span>')
      .replace(/#([\wşçöğüıİ]+)/gi, '<span class="text-blue-400">#$1</span>')
      .replace(
        /(https?:\/\/[\w\.\/]+)/,
        '<span class="text-blue-400">$1</span>'
      )
      .replace(/\n/g, '<br />');
    return tweet;
  };

  const formatNumber = number => {
    if (number < 1000) {
      return number;
    }
    number /= 1000;
    number = String(number).split('.');

    return (
      number[0] + (number[1] >= 100 ? ',' + number[1].slice(0, 1) + ' B' : 'B')
    );
  };

  const imageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', function() {
      setImage(this.result);
    });
    reader.readAsDataURL(file);
  };

  return (
    <div class="flex gap-16 h-full">
      <div class="w-2/5 border-r-2 border-b-2 border-gray-700 rounded-lg">
        <h1 class="w-full flex text-gray-400 font-semibold border-b-2 border-gray-700 justify-center">
          Tweet Ayarları
        </h1>
        <ul class="w-full flex flex-col">
          <li class="text-gray-200 text-xs">
            <div class="border-2 border-gray-700">
              <span class="text-gray-400"> Full Name </span>
              <input
                class="bg-black outline-none w-full h-12"
                value={fullName}
                onChange={e => setFullname(e.target.value)}
              />
            </div>
          </li>
          <li class="text-gray-200 text-xs">
            <div class="border-2 border-gray-700">
              <span class="text-gray-400">Username</span>
              <input
                class="bg-black outline-none w-full h-12"
                value={userName}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
          </li>
          <li class="text-gray-200 text-xs">
            {' '}
            <div class="border-2 border-gray-700">
              <span class="text-gray-400">Image</span>
              <input
                type="file"
                class="bg-black outline-none w-full h-12 py-2"
                onChange={imageHandler}
              />
            </div>{' '}
          </li>
          <li class="text-gray-200 text-xs">
            <div class="border-2 border-gray-700">
              <span class="text-gray-400">Tweet</span>
              <textarea
                maxLength="290"
                class="bg-black outline-none w-full h-12"
                value={content}
                onChange={e => setContent(e.target.value)}
              />
            </div>
          </li>
          <li class="text-gray-200 text-xs">
            <div class="border-2 border-gray-700">
              <span class="text-gray-400"># of Retweet</span>
              <input
                type="number"
                class="bg-black outline-none w-full h-12"
                value={retweet}
                onChange={e => setRetweet(e.target.value)}
              />
            </div>
          </li>
          <li class="text-gray-200 text-xs">
            <div class="border-2 border-gray-700">
              <span class="text-gray-400"># of Quote Tweet</span>
              <input
                type="number"
                class="bg-black outline-none w-full h-12"
                value={quoteTweet}
                onChange={e => setQuotetweet(e.target.value)}
              />
            </div>
          </li>
          <li class="text-gray-200 text-xs">
            <div class="border-2 border-gray-700">
              <span class="text-gray-400"># of Like</span>
              <input
                type="number"
                class="bg-black outline-none w-full h-12"
                value={like}
                onChange={e => setLike(e.target.value)}
              />
            </div>
          </li>
        </ul>
      </div>

      <div class="w-3/5 h-full border-2 border-gray-700 flex flex-col justify-content-center p-4">
        <div class="flex flex-row">
          <div class="w-16 h-16 bg-white rounded-full mr-4">
            <img
              class="rounded-full"
              src={
                image ||
                'https://pbs.twimg.com/profile_images/1413787566722146304/MP7UkHyc_400x400.jpg'
              }
            />
          </div>
          <div>
            <div class="text-gray-200"> {fullName || 'Name Surname'} </div>
            <div class="text-gray-500 text-sm">@{userName || 'username'}</div>
          </div>
        </div>
        <div
          class="text-gray-200 mt-4 break-words"
          dangerouslySetInnerHTML={{
            __html:
              (content && tweetFormat(content)) ||
              'It is an @example #content http://www.for.com your fake tweet... Hello world! New line...'
          }}
        />
        <hr class="py-2 mt-4 border-gray-700" />
        <div class="flex flex-row gap-4">
          <div>
            <span class="text-gray-200"> {formatNumber(retweet) || 0} </span>
            <span class="text-gray-500"> Retweet </span>
          </div>
          <div>
            <span class="text-gray-200"> {formatNumber(quoteTweet) || 0} </span>
            <span class="text-gray-500"> Alıntı Tweetler </span>
          </div>
          <div>
            <span class="text-gray-200"> {formatNumber(like) || 0} </span>
            <span class="text-gray-500"> Beğeni </span>
          </div>
        </div>
        <hr class="py-2 mt-4 border-gray-700" />
        <div class="flex flex-row justify-between px-12">
          <ReplyIcon />
          <RetweetIcon />
          <LikeIcon />
          <ShareIcon />
        </div>
      </div>
    </div>
  );
}
