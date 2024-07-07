---
# You can also start simply with 'default'
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: bg.png
# some information about your slides (markdown enabled)
title: Welcome to AuthMark
info: |
  ## AuthMark
  Protecting citizens and business against malicious AGI (deepfakes, voice cloning, disinformation).
# apply unocss classes to the current slide
class: text-center
# slide transition: https://sli.dev/guide/animations#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/guide/syntax#mdc-syntax
mdc: true
contextMenu: false
---

<div class="flex justify-center items-center">
  <img width="220" height="220" src="/logo.png"/><br>
</div>
<br>

<div class="left-0">
<h4>Decentralized Proof of Life & Proof of Authenticity Protocol
          to protecting against malicious AI</h4>
</div>

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>



<div class="abs-br mr-6 mb-1">
    {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}
    <span
      @click="$slidev.nav.next"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-right class="inline" />
    </span>
</div>

<template>

  <div absolute bottom-1 right-0 left-0 text-center text-xs><a href="https://authmark.org" target="_blank">AuthMark.org</a></div>
</template>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->


---
transition: fade-out
---


<br>
<h3 class=text-center>
Deep fakes / synthetic videos  and voice cloning will soon be impossible to distinguish from real humans.</h3>

<div class="flex justify-center items-center">
  <img width="420" height="200"  class="pa-4" src="/fake.png"/><br>
</div>
<br>

<div class="page">
<div class="abs-br mr-6 mb-1 text-xs left-6 pa-2">
    <a href="https://authmark.org" target="_blank">AuthMark.org</a>
  </div>


<div class="abs-br mr-6 mb-1">
      <span
      @click="$slidev.nav.prev"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-left class="inline" />
    </span>
    {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}
    <span
      @click="$slidev.nav.next"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-right class="inline" />
    </span>

</div>
</div>

<!--
You can have `style` tag in markdown to override the style for the current page.
Learn more: https://sli.dev/guide/syntax#embedded-styles
-->

---
transition: fade-out
---
<div class="text-center">
<div class="grid grid-cols-2">
  <div class="col-span-1 ma-8">Imagine receiving a call from a loved one, only to find out it was a deep fake / voice clone, tricking you into sending a criminal money.</div>
  <div class="col-span-1"><img width="220" height="200"  class="round" src="/fake2.png"/></div>
</div>
<hr class="py-3 mt-4">
<div class="grid grid-cols-2">
<div class="col-span-1"><img width="320" height="200" class="" src="/fake3.jpg"/></div>
  <div class="col-span-0 ma-1 mt-8">Or a trusted business partner sending you a deep fake video of a meeting, causing you to make a decision that costs your
company millions.</div>

</div>




</div>



<div class="page">
<div class="abs-br mr-6 mb-1 text-xs left-6 pa-2">
    <a href="https://authmark.org" target="_blank">AuthMark.org</a>
  </div>


<div class="abs-br mr-6 mb-1">
      <span
      @click="$slidev.nav.prev"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-left class="inline" />
    </span>
    {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}
    <span
      @click="$slidev.nav.next"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-right class="inline" />
    </span>

</div>
</div>


<style>
img.round {
    border-radius: 100%;
    border: solid;
}
</style>


---
transition: fade-out
---


<br>
<h3 class=text-center>This is not sci-fi, these scams & crimes are already possible!</h3>
<h3 class=text-center>
Everday citizens & businesses are ill-prepared against the new wave AI crime</h3>


<div class="flex justify-center items-center">
  <img width="620" height="200"  class="pa-4" src="/ai-crime.jpg"/><br>
</div>
<h3 class=text-center>Cybercrime is set to cost $10.5 trillion globally by the end of 2025</h3>


<div class="page">
<div class="abs-br mr-6 mb-1 text-xs left-6 pa-2">
    <a href="https://authmark.org" target="_blank">AuthMark.org</a>
  </div>


<div class="abs-br mr-6 mb-1">
      <span
      @click="$slidev.nav.prev"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-left class="inline" />
    </span>
    {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}
    <span
      @click="$slidev.nav.next"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-right class="inline" />
    </span>

</div>
</div>

<!--
You can have `style` tag in markdown to override the style for the current page.
Learn more: https://sli.dev/guide/syntax#embedded-styles
-->

---
layout: image-right
image: /problem.png
transition: fade-out
---

# Problems

- Deep fakes and voice cloning are becoming indistinguishable from real, no easy way to verify
- No easy way to verify authenticity of information (misinformation)
- Protecting copyrighted material from digital fraud such as (recent school exam leaks) or company PR & confidential
  docs leaks

<div class="abs-br mr-6 mb-1">
      <span
      @click="$slidev.nav.prev"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-left class="inline" />
    </span>
    {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}
    <span
      @click="$slidev.nav.next"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-right class="inline" />
    </span>

</div>


---
transition: fade-out
---

## Solution explored during hackathon

1) Preventative protection

2) DeepFake & synthetic content detection

3) Proof of authenticity & Proof of Life using our Decentralized Proof of Authenticity Protocol (dePoAP)

<div class="abs-br mr-6 mb-1">
      <span
      @click="$slidev.nav.prev"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-left class="inline" />
    </span>
    {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}
    <span
      @click="$slidev.nav.next"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-right class="inline" />
    </span>

</div>


---
transition: fade-out
---

## Demo

POL

status for type of media

document, copy paste
scan dor leak

video - poc + meet
Cross-platoform, full-proof for non-technical users

How it works

Html banner (verified)
https://codepen.io/abhayap/pen/ybjdWR

Sign Authneticty using face, trigger contrce
Scan for on chain record

Html banner (Deepfake)
Html banner (notes)

Business model

nevermined


<div class="abs-br mr-6 mb-1">
      <span
      @click="$slidev.nav.prev"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-left class="inline" />
    </span>
    {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}
    <span
      @click="$slidev.nav.next"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-right class="inline" />
    </span>

</div>


---
transition: fade-out
---

## 1) Preventative Protection

1) Intentional "AI Poisoning" Inspired by "Nightshade" modifies pixels in a minimal way not perceived by the human eye ,
   misleads AI scrapers and generators.

<div class="flex justify-center items-center ma-1">
  <img width="300" height="400" src ="/nightshade.png"/><br>
</div>

2) Turns out a much simpler approach was to use colors that are invisible to the human eye ("ultraviolet"), but that AI
   models
   interpret as something else -> Tom Cruise or Mr Bean?

<div class="flex justify-center items-center ma-2">
<img width="320" height="400" src ="/cruise-bean.png"/><br>
</div>


<div class="abs-br mr-6 mb-1">
      <span
      @click="$slidev.nav.prev"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-left class="inline" />
    </span>
    {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}
    <span
      @click="$slidev.nav.next"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-right class="inline" />
    </span>

</div>


---
transition: fade-out
---

## Challenges with preventative protection

<br>
1. Change sometimes are noticeable and not suitable for hi-res images/video

2. Easy for AI scrapers/generators to adapt their models to mitigate
3. Cat and mouse game between good actors and bad actors

<div class="text-center mt-7">
<b>Verdict:</b> Not a viable option, limited use cases easy to mitigate never ending Cat and mouse game between good actors and bad actors
<div class="flex justify-center items-center ma-2">
<img width="320" height="400" src ="/cat-mouse.gif"/><br>
</div>
</div>


<div class="abs-br mr-6 mb-1">
      <span
      @click="$slidev.nav.prev"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-left class="inline" />
    </span>
    {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}
    <span
      @click="$slidev.nav.next"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-right class="inline" />
    </span>

</div>

---
transition: fade-out
---

## 2.1) Deep Fake and Synthetic Content Detection

There are a dozen of models both open source and proprietary that can detect deep fakes and synthetic content,
however in a rapdily developing landscape many are no longer effective.

For deepfake detection models to be effective they require on going collaborative iterations which is why we integrated
with Allora:


<div class="flex justify-center items-center ma-2">
<img width="600" src ="/allora.png"/><br>
</div>


<div class="abs-br mr-6 mb-1">
      <span
      @click="$slidev.nav.prev"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-left class="inline" />
    </span>
    {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}
    <span
      @click="$slidev.nav.next"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-right class="inline" />
    </span>

</div>

---
transition: fade-out
---

## 2.2) Aggregate of verified misinformation

X/Twitter community notes & British Broadcasting Corporation (BBC Verify) are good examples of verifying misinformation,
by aggregating a wide range of "verified misinformation" sources, we can create a more effective AI model.

Users simply install the "AuthMark Chrome extension" which will search website pages in realtime for misinformation and
synthetic content.

<div class="grid grid-cols-2">
  <div class="col-span-1 ma-8"><img width="250" height="250" src ="/chrome-ext-1.png"/><br><img width="250" height="250" src ="/chrome-ext-2.png"/></div>
  <div class="col-span-1"><img  height="450" src ="/df-detected.png"/><br></div>
</div>


<div class="abs-br mr-6 mb-1">
      <span
      @click="$slidev.nav.prev"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-left class="inline" />
    </span>
    {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}
    <span
      @click="$slidev.nav.next"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-right class="inline" />
    </span>

</div>



---
transition: fade-out
---

## 3) Proof of authenticity & Proof of Life

Previously mentioned solutions will always have an element of cat and mouse game between good actors and bad actors,
therefore we
believe Proof of authenticity & Proof of Life are the only real, effective and long term solution, which is why we
decided to focus on developing a <b>Proof Authenticity Protocol (dePoAP)</b>

Features:

- AI digital watermarking (methods for video, audio,images and documents)
- Secure font "AuthMarkFont" (digital watermarked fonts)
- Decentralized Proof of Life and Authenticity Protocol (dePoAP)
- Reverse proxy for dynamic content delivery and status updates

We use Naptha.AI and Marlin for the following:

1) Decentralised key pair for Proof of Life: public key stored on chain, private key is only created on device, access
   to both is required to create and Proof of Authentication.
2) An immutable and verifiable record of all "Authenticated Proof" stored on chain to verify content, this could also be
   paired with an IPFS for some use cases.

<div class="abs-br mr-6 mb-1">
      <span
      @click="$slidev.nav.prev"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-left class="inline" />
    </span>
    {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}
    <span
      @click="$slidev.nav.next"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-right class="inline" />
    </span>

</div>


---

<div class="page">
<div class="abs-br mr-6 mb-1 text-xs left-6 pa-2">
    <a href="https://authmark.org" target="_blank">AuthMark.org</a>
  </div>

## How it works

- Stegnography (in code)
- LSB Steganography (using pixels)
- Color Spectrum
- "Morse code" within audio

AI water markings & fingerprints are injected directly into the media device/wasm this way the stream is never exposed
to a "middleman"

Meta data is stored on chain, IP, "license time" proof of authenticity, custom data

Scanning the live stream or doc for the watermark, will verify based on the on chain record

Also experimenting with A.I generative fonts that are "fingerprinted" which can be used to verify the authenticity of
message or printed docs.

Screen shot and leak protection



<div class="abs-br mr-6 mb-1">
      <span
      @click="$slidev.nav.prev"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-left class="inline" />
    </span>
    {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}

</div>
</div>


---

## How it works

<div class="grid grid-cols-2 mt-4">
  <div class="col-span-1"><img width="450"  src ="/inject-code.png"/></div>
  <div class="col-span-1"><img  height="450" src ="/watermark-scanner.png"/><br></div>
</div>


<div class="grid grid-cols-2 mt-2">
  <div class="col-span-1   mx-5"><img width="350"  src ="/doc.png"/></div>
  <div class="col-span-1 mx-5"><img width="350" src ="/doc-scanner.png"/></div>
</div>



<div class="abs-br mr-6 mb-1">
      <span
      @click="$slidev.nav.prev"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-left class="inline" />
    </span>
    {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}

</div>


---

<div class="page">
<div class="abs-br mr-6 mb-1 text-xs left-6 pa-2">
    <a href="https://authmark.org" target="_blank">AuthMark.org</a>
  </div>

## Business Model

Free starter plan for 5x Proof of Authentication and 7 days of protection.

Bronze plan for $5/month for 20x Proof of Authentication and full protection.

Silver plan for $19/month for 100x Proof of Authentication and full protection.

Gold plan for families/multi account $59/month for 200x Proof of Authentication and full protection.

Enterprise plan for employees ands company wide protection.

Payments powered By nevermined


<div class="abs-br mr-6 mb-1">
      <span
      @click="$slidev.nav.prev"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-left class="inline" />
    </span>
    {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}

</div>
</div>


---

<!-- 
Vision 
-->

<div class="page">
<div class="abs-br mr-6 mb-1 text-xs left-6 pa-2">
    <a href="https://authmark.org" target="_blank">AuthMark.org</a>
  </div>

## Vision

<p>Proof of Life & Proof of Authenticity should be owned and controlled by users not big tech.</p>
<p>Firewalls and Anti-virus software are important tools to protect against cyber crime.</p>
<p>Authmark is positioning itself to be a must have tool to protect businesses and citizens against the next generation malicious AI threats.</p>

<div class="flex justify-center items-center pa-6">
  <img width="250" height="250" src ="/hero-2.png"/><br>
</div>


<div class="abs-br mr-6 mb-1">
      <span
      @click="$slidev.nav.prev"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-left class="inline" />
    </span>
    {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}

</div>
</div>



---
layout: center
class: text-center
---
<div class="lastp">

<div class="flex justify-center items-center">
  <img width="220" height="220" src ="/logo.png"/><br>
</div>
<br>
AI powered Authenticity & Protection from AI threats, for citizens and businesses

<br>
<h3 class="pa-5"><a href="https://authmark.org" target="_blank">AuthMark.org</a></h3>

[PoC Demo](https://AuthMark.org/demo)  · [GitHub](https://github.com/AuthMark)

<div class="abs-br mr-6 mb-1">
      <span
      @click="$slidev.nav.prev"
      class="arrow-container cursor-pointer text-white"
      hover="bg-altBlue bg-opacity-75 text-white"
    >
      <carbon:chevron-left class="inline" />
    </span>
    {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}

</div>
</div>

  


