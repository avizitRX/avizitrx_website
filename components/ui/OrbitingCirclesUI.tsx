"use client";
import React from "react";
import { OrbitingCircles } from "../magicui/orbiting-circles";

const OrbitingCirclesUI = () => {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={50} radius={200}>
        <Icons.html />
        <Icons.css />
        <Icons.tailwindcss />
        <Icons.nextjs />
        <Icons.django />
      </OrbitingCircles>
      <OrbitingCircles iconSize={40} radius={133.34} reverse speed={2}>
        <Icons.tensorflow />
        <Icons.pytorch />
        <Icons.numpy />
        <Icons.pandas />
      </OrbitingCircles>
      <OrbitingCircles iconSize={30} radius={66.67} speed={3}>
        <Icons.flutter />
        <Icons.getx />
        <Icons.bloc />
      </OrbitingCircles>
    </div>
  );
};

export default OrbitingCirclesUI;

const Icons = {
  tensorflow: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <polygon fill="#ffa000" points="16,39.609 23,43.609 23,4 16,8"></polygon>
      <polygon
        fill="#ffa000"
        points="23,12.433 6,22.25 6,13.75 23,3.933"
      ></polygon>
      <polygon fill="#ffb300" points="32,39.609 25,43.609 25,4 32,8"></polygon>
      <polygon
        fill="#ffb300"
        points="25,12.433 42,22.25 42,13.75 25,3.933"
      ></polygon>
      <polygon
        fill="#ffb300"
        points="29,19.732 29,27.365 36,31.407 36,23.775"
      ></polygon>
    </svg>
  ),

  pytorch: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <linearGradient
        id="hqBdiw7hWbh_bf9we5wHOa_jH4BpkMnRrU5_gr1"
        x1="18.6"
        x2="29.117"
        y1="10.403"
        y2="42.736"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#f44f5a"></stop>
        <stop offset=".443" stop-color="#ee3d4a"></stop>
        <stop offset="1" stop-color="#e52030"></stop>
      </linearGradient>
      <path
        fill="url(#hqBdiw7hWbh_bf9we5wHOa_jH4BpkMnRrU5_gr1)"
        d="M36.277,15.251C39.276,18.384,41,22.571,41,27c0,9.374-7.626,17-17,17S7,36.374,7,27	c0-8.518,8.812-15.984,15.894-21.983c0.379-0.321,0.74-0.629,1.106-0.941v5.25C17.865,14.559,11,20.837,11,27	c0,7.168,5.832,13,13,13s13-5.832,13-13c0-3.428-1.363-6.657-3.709-9.062L36.277,15.251z M30,10c-1.105,0-2,0.895-2,2s0.895,2,2,2	s2-0.895,2-2S31.105,10,30,10z"
      ></path>
    </svg>
  ),

  numpy: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <polygon
        fill="#00acc1"
        points="21.196,12.276 14.392,8.842 6.922,12.569 13.912,16.078"
      ></polygon>
      <polygon
        fill="#00acc1"
        points="24.317,13.85 31.451,17.453 24.049,21.169 17.049,17.654"
      ></polygon>
      <polygon
        fill="#00acc1"
        points="33.846,8.893 41.176,12.569 34.619,15.86 27.47,12.254"
      ></polygon>
      <polygon
        fill="#00acc1"
        points="30.69,7.31 24.091,4 17.564,7.258 24.364,10.687"
      ></polygon>
      <polygon
        fill="#00acc1"
        points="25.532,35.725 25.532,44.73 33.525,40.74 33.518,31.732"
      ></polygon>
      <polygon
        fill="#00acc1"
        points="33.514,28.587 33.505,19.674 25.532,23.637 25.532,32.554"
      ></polygon>
      <polygon
        fill="#00acc1"
        points="43.111,26.918 43.111,35.957 36.292,39.359 36.287,30.361"
      ></polygon>
      <polygon
        fill="#00acc1"
        points="43.111,23.756 43.111,14.898 36.279,18.294 36.285,27.225"
      ></polygon>
      <path
        fill="#448aff"
        d="M22.71,23.637l-5.384-2.708v11.699c0,0-6.586-14.012-7.195-15.27 c-0.079-0.163-0.401-0.341-0.484-0.385C8.46,16.353,5,14.601,5,14.601v20.676l4.787,2.566V27.031c0,0,6.515,12.52,6.582,12.657 s0.718,1.455,1.418,1.919c0.929,0.618,4.919,3.016,4.919,3.016L22.71,23.637z"
      ></path>
    </svg>
  ),

  pandas: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <rect width="5" height="10" x="18" y="4" fill="#1a237e"></rect>
      <rect width="5" height="10" x="18" y="25" fill="#1a237e"></rect>
      <rect width="5" height="5" x="18" y="17" fill="#fbc02d"></rect>
      <rect width="5" height="33" x="10" y="13" fill="#1a237e"></rect>
      <rect width="5" height="10" x="26" y="33" fill="#1a237e"></rect>
      <rect width="5" height="10" x="26" y="12" fill="#1a237e"></rect>
      <rect width="5" height="5" x="26" y="25" fill="#ff4081"></rect>
      <rect width="5" height="33" x="34" y="2" fill="#1a237e"></rect>
    </svg>
  ),

  html: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <path fill="#E65100" d="M41,5H7l3,34l14,4l14-4L41,5L41,5z"></path>
      <path fill="#FF6D00" d="M24 8L24 39.9 35.2 36.7 37.7 8z"></path>
      <path
        fill="#FFF"
        d="M24,25v-4h8.6l-0.7,11.5L24,35.1v-4.2l4.1-1.4l0.3-4.5H24z M32.9,17l0.3-4H24v4H32.9z"
      ></path>
      <path
        fill="#EEE"
        d="M24,30.9v4.2l-7.9-2.6L15.7,27h4l0.2,2.5L24,30.9z M19.1,17H24v-4h-9.1l0.7,12H24v-4h-4.6L19.1,17z"
      ></path>
    </svg>
  ),

  css: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <path fill="#0277BD" d="M41,5H7l3,34l14,4l14-4L41,5L41,5z"></path>
      <path fill="#039BE5" d="M24 8L24 39.9 35.2 36.7 37.7 8z"></path>
      <path
        fill="#FFF"
        d="M33.1 13L24 13 24 17 28.9 17 28.6 21 24 21 24 25 28.4 25 28.1 29.5 24 30.9 24 35.1 31.9 32.5 32.6 21 32.6 21z"
      ></path>
      <path
        fill="#EEE"
        d="M24,13v4h-8.9l-0.3-4H24z M19.4,21l0.2,4H24v-4H19.4z M19.8,27h-4l0.3,5.5l7.9,2.6v-4.2l-4.1-1.4L19.8,27z"
      ></path>
    </svg>
  ),

  tailwindcss: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <linearGradient
        id="iOmQfjoCC4Hw6zVwRjSDha_x7XMNGh2vdqA_gr1"
        x1="21.861"
        x2="25.703"
        y1="8.237"
        y2="36.552"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#00c1e0"></stop>
        <stop offset="1" stop-color="#009bb8"></stop>
      </linearGradient>
      <path
        fill="url(#iOmQfjoCC4Hw6zVwRjSDha_x7XMNGh2vdqA_gr1)"
        d="M24,9.604c-5.589,0-9.347,2.439-11.276,7.318c-0.2,0.505,0.417,0.92,0.816,0.551 c2.035-1.882,4.322-2.505,6.86-1.871c1.826,0.456,3.131,1.781,4.576,3.247C27.328,21.236,30.051,24,36,24 c5.589,0,9.348-2.44,11.276-7.319c0.2-0.505-0.417-0.92-0.816-0.551c-2.035,1.882-4.322,2.506-6.86,1.872 c-1.825-0.456-3.13-1.781-4.575-3.247C32.672,12.367,29.948,9.604,24,9.604L24,9.604z M12,24c-5.589,0-9.348,2.44-11.276,7.319 c-0.2,0.505,0.417,0.92,0.816,0.551c2.035-1.882,4.322-2.506,6.86-1.871c1.825,0.457,3.13,1.781,4.575,3.246 c2.353,2.388,5.077,5.152,11.025,5.152c5.589,0,9.348-2.44,11.276-7.319c0.2-0.505-0.417-0.92-0.816-0.551 c-2.035,1.882-4.322,2.506-6.86,1.871c-1.826-0.456-3.131-1.781-4.576-3.246C20.672,26.764,17.949,24,12,24L12,24z"
      ></path>
    </svg>
  ),

  nextjs: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <linearGradient
        id="NRNx2IPDe7PJlJvrxOKgWa_MWiBjkuHeMVq_gr1"
        x1="24"
        x2="24"
        y1="43.734"
        y2="4.266"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#0a070a"></stop>
        <stop offset=".465" stop-color="#2b2b2b"></stop>
        <stop offset="1" stop-color="#4b4b4b"></stop>
      </linearGradient>
      <circle
        cx="24"
        cy="24"
        r="19.734"
        fill="url(#NRNx2IPDe7PJlJvrxOKgWa_MWiBjkuHeMVq_gr1)"
      ></circle>
      <rect
        width="3.023"
        height="15.996"
        x="15.992"
        y="16.027"
        fill="#fff"
      ></rect>
      <linearGradient
        id="NRNx2IPDe7PJlJvrxOKgWb_MWiBjkuHeMVq_gr2"
        x1="30.512"
        x2="30.512"
        y1="33.021"
        y2="18.431"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".377" stop-color="#fff" stop-opacity="0"></stop>
        <stop offset=".666" stop-color="#fff" stop-opacity=".3"></stop>
        <stop offset=".988" stop-color="#fff"></stop>
      </linearGradient>
      <rect
        width="2.953"
        height="14.59"
        x="29.035"
        y="15.957"
        fill="url(#NRNx2IPDe7PJlJvrxOKgWb_MWiBjkuHeMVq_gr2)"
      ></rect>
      <linearGradient
        id="NRNx2IPDe7PJlJvrxOKgWc_MWiBjkuHeMVq_gr3"
        x1="22.102"
        x2="36.661"
        y1="21.443"
        y2="40.529"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".296" stop-color="#fff"></stop>
        <stop offset=".521" stop-color="#fff" stop-opacity=".5"></stop>
        <stop offset=".838" stop-color="#fff" stop-opacity="0"></stop>
      </linearGradient>
      <polygon
        fill="url(#NRNx2IPDe7PJlJvrxOKgWc_MWiBjkuHeMVq_gr3)"
        points="36.781,38.094 34.168,39.09 15.992,16.027 19.508,16.027"
      ></polygon>
    </svg>
  ),

  django: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <path
        fill="#004d40"
        fill-rule="evenodd"
        d="M8,16v12.646C6.655,28.9,5.949,29,4.878,29 C1.67,28.997,0,27.565,0,24.816c0-2.649,1.771-4.368,4.516-4.368c0.426,0,0.75,0.033,1.143,0.134V16H8z M5.659,22.672 c-0.308-0.1-0.561-0.134-0.886-0.134c-1.328,0-2.096,0.809-2.096,2.228c0,1.381,0.734,2.143,2.079,2.143 c0.291,0,0.527-0.016,0.903-0.067V22.672L5.659,22.672z"
        clip-rule="evenodd"
      ></path>
      <path
        fill="#004d40"
        fill-rule="evenodd"
        d="M12,20.046v6.618c0,2.076-0.155,3.224-0.612,4.084 c-0.426,0.827-0.987,1.349-2.146,1.925l-2.437-1.149c1.159-0.539,1.721-1.015,2.079-1.742c0.375-0.743,0.494-1.754,0.494-4.017 v-5.721H12z"
        clip-rule="evenodd"
      ></path>
      <rect
        width="2.623"
        height="2.713"
        x="9.377"
        y="16"
        fill="#004d40"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ></rect>
      <path
        fill="#004d40"
        fill-rule="evenodd"
        d="M13.734,20.876c1.136-0.552,2.223-0.795,3.408-0.795 c1.321,0,2.189,0.363,2.573,1.073C19.93,21.551,20,22.068,20,23.175v5.407c-1.152,0.171-2.606,0.294-3.673,0.294 c-2.156,0-3.123-0.778-3.123-2.505c0-1.868,1.285-2.731,4.441-3.006V22.78c0-0.483-0.235-0.658-0.884-0.658 c-0.95,0-2.02,0.278-3.024,0.812L13.734,20.876z M17.761,25.107c-1.702,0.171-2.255,0.449-2.255,1.141 c0,0.518,0.318,0.761,1.02,0.761c0.384,0,0.735-0.034,1.235-0.12L17.761,25.107L17.761,25.107z"
        clip-rule="evenodd"
      ></path>
      <path
        fill="#004d40"
        fill-rule="evenodd"
        d="M21.418,20.693c1.52-0.421,2.772-0.613,4.041-0.613 c1.318,0,2.273,0.317,2.839,0.93C28.83,21.588,29,22.222,29,23.573v5.303h-2.574v-5.195c0-1.038-0.335-1.424-1.252-1.424 c-0.351,0-0.669,0.035-1.186,0.195v6.425h-2.57V20.693z"
        clip-rule="evenodd"
      ></path>
      <path
        fill="#004d40"
        fill-rule="evenodd"
        d="M30.177,30.006c0.919,0.486,1.839,0.71,2.812,0.71 c1.721,0,2.454-0.473,2.454-2.176v-0.052c-0.51,0.258-1.025,0.366-1.704,0.366c-2.302,0-3.739-1.547-3.739-3.997 c0-3.043,2.141-4.762,5.974-4.762c1.126,0,2.167,0.121,3.427,0.383l-0.899,1.93c-0.699-0.138-0.057-0.021-0.584-0.072v0.279 l0.034,1.13l0.017,1.461c0.017,0.366,0.017,0.73,0.034,1.096v0.73c0,2.295-0.19,3.131-0.751,4.02 c-0.818,1.302-2.234,1.947-4.246,1.947c-1.024,0-1.91-0.155-2.829-0.521V30.006L30.177,30.006z M35.392,22.251h-0.085h-0.19 c-0.51-0.017-1.108,0.121-1.518,0.383c-0.628,0.365-0.953,1.027-0.953,1.964c0,1.337,0.649,2.102,1.808,2.102 c0.358,0,0.649-0.069,0.987-0.172v-0.193v-0.73c0-0.314-0.017-0.662-0.017-1.027l-0.017-1.234l-0.017-0.886V22.251z"
        clip-rule="evenodd"
      ></path>
      <path
        fill="#004d40"
        fill-rule="evenodd"
        d="M43.566,20.046c2.753,0,4.434,1.66,4.434,4.348 c0,2.756-1.752,4.483-4.544,4.483c-2.756,0-4.456-1.659-4.456-4.33C39.005,21.774,40.757,20.046,43.566,20.046z M43.509,26.752 c1.057,0,1.681-0.838,1.681-2.294c0-1.439-0.607-2.294-1.663-2.294c-1.093,0-1.718,0.838-1.718,2.294 C41.81,25.914,42.438,26.752,43.509,26.752L43.509,26.752z"
        clip-rule="evenodd"
      ></path>
    </svg>
  ),

  flutter: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <polygon fill="#40c4ff" points="26,4 6,24 12,30 38,4"></polygon>
      <polygon fill="#40c4ff" points="38,22 27,33 21,27 26,22"></polygon>
      <rect
        width="8.485"
        height="8.485"
        x="16.757"
        y="28.757"
        fill="#03a9f4"
        transform="rotate(-45.001 21 33)"
      ></rect>
      <polygon fill="#01579b" points="38,44 26,44 21,39 27,33"></polygon>
      <polygon fill="#084994" points="21,39 30,36 27,33"></polygon>
    </svg>
  ),

  getx: () => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      id="Getx--Streamline-Simple-Icons"
      height="24"
      width="24"
    >
      <desc>Getx Streamline Icon: https://streamlinehq.com</desc>
      <title>GetX</title>
      <path
        d="M10.643 0.934c-0.302 0.067 -0.928 0.29 -1.386 0.503 -2.167 1.05 -3.485 3.52 -3.15 5.899a5.76 5.76 0 0 0 1.575 3.25c1.128 1.174 2.469 1.732 4.134 1.744 1.642 0 2.994 -0.57 4.133 -1.743C19.39 7 17.055 1.113 12.095 0.867c-0.492 -0.022 -1.14 0 -1.452 0.067zM13.77 3.17c0.905 0.335 1.966 1.374 2.178 2.145 0.213 0.793 0.1 1.82 -0.29 2.547 -0.86 1.575 -2.816 2.726 -3.989 2.346 -0.536 -0.179 -1.25 -0.994 -1.642 -1.855 -0.847 -1.889 -1.127 -3.52 -0.736 -4.28 0.592 -1.15 2.715 -1.575 4.48 -0.904Zm-9.663 8.69c-2.838 0.916 -4.513 3.598 -4.022 6.48 0.48 2.86 3.173 4.994 6.033 4.77 2.033 -0.145 3.765 -1.24 4.681 -2.96 0.503 -0.96 0.681 -1.676 0.681 -2.815 0 -2.045 -0.971 -3.799 -2.737 -4.894 -1.24 -0.782 -3.25 -1.028 -4.636 -0.58Zm2.436 1.799c2.737 0.447 4.222 2.737 3.15 4.882 -0.436 0.86 -1.352 1.732 -2.29 2.179 -0.637 0.29 -0.838 0.335 -1.43 0.29 -1.028 -0.067 -1.486 -0.48 -2.045 -1.877 -0.67 -1.642 -0.95 -3.608 -0.614 -4.245 0.413 -0.771 1.117 -1.162 2.413 -1.33 0.067 0 0.424 0.045 0.816 0.101zm9.842 -1.743c-3.34 1.173 -4.837 4.882 -3.273 8.077 0.435 0.894 1.463 1.944 2.38 2.425 2.356 1.24 4.904 0.871 6.78 -0.995 3.05 -3.016 1.9 -8.077 -2.178 -9.507 -1.039 -0.368 -2.67 -0.368 -3.709 0zm3.419 1.978c1.184 0.38 2.368 1.485 2.636 2.48 0.179 0.659 0.078 1.609 -0.223 2.234 -0.548 1.129 -1.91 2.145 -3.251 2.413 -1.81 0.358 -2.737 -0.882 -3.15 -4.19 -0.247 -1.999 0.3 -2.915 1.91 -3.16 0.67 -0.101 1.25 -0.046 2.078 0.223z"
        fill="#660eb3"
        stroke-width="1"
      ></path>
    </svg>
  ),

  bloc: () => (
    <svg
      width="34px"
      height="39px"
      viewBox="0 0 34 39"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>bloc</title>
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g id="bloc">
          <g id="black-hex" fill="#000000">
            <polygon
              id="Rectangle"
              transform="translate(25.467925, 23.864151) scale(1, -1) translate(-25.467925, -23.864151) "
              points="16.9358491 9.23773585 33.8689605 18.4754717 34 38.490566 16.9358491 29.2528302"
            ></polygon>
            <polygon
              id="Rectangle"
              transform="translate(17.000000, 9.237736) scale(1, -1) translate(-17.000000, -9.237736) "
              points="16.934475 0 34 9.23773585 17 18.4754717 0 9.23773585"
            ></polygon>
            <polygon
              id="Rectangle"
              points="0 9.23773585 16.9358491 18.4754717 16.9358491 38.490566 2.23582855e-15 29.2528302"
            ></polygon>
          </g>
          <g id="cube" transform="translate(2.822642, 3.207547)">
            <polygon
              id="Rectangle"
              fill="#00D3B9"
              transform="translate(21.224420, 19.886792) scale(1, -1) translate(-21.224420, -19.886792) "
              points="14.1132075 7.69811321 28.2264151 15.3962264 28.3356323 32.0754717 14.1132075 24.3773585"
            ></polygon>
            <path
              d="M14.1141277,0.569041943 L1.04571825,7.69726526 L14.1678161,14.8271852 L27.2867975,7.69895864 L14.1141277,0.569041943 Z"
              id="Rectangle"
              stroke="#0084C1"
              fill="#0084C1"
              transform="translate(14.167816, 7.698113) scale(1, -1) translate(-14.167816, -7.698113) "
            ></path>
            <polygon
              id="Rectangle"
              fill="#82EDDF"
              points="0.019245283 7.69811321 14.1133681 15.3962264 14.1133681 32.0754717 0.019245283 24.3773585"
            ></polygon>
          </g>
        </g>
      </g>
    </svg>
  ),
};
