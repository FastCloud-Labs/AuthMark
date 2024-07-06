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
<h3 class=text-center>Cybercrime will cost $10.5 trillion globally by the end of 2025</h3>

<div class="flex justify-center items-center">
  <img width="620" height="200"  class="pa-4" src="/ai-crime.jpg"/><br>

</div>

<h3 class=text-center>
Everday citizens & businesses are ill-prepared against the new wave AI crime</h3>

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

# Solution Overview

1) Protection

   - AI models to generate Digital watermarking /poisoning using Allora for ongoing iterations & collaborative improvements

2) Detection

   - AI models to detect synthetic content using Allora for ongoing iterations & collaborative improvements
   - Centralized aggregate of verified misinformation
       - x/twitter notes
       - British Broadcasting Corporation (BBC Verify)

3) Proof of Authenticity and Ownership

   - AI digital watermarking
   - Secure font "AuthMarkFont" (digital watermarked fonts)
   - Decentralized Proof of Life and Authenticity Protocol (dePoAP)

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

# Motion

Motion animations are powered by [@vueuse/motion](https://motion.vueuse.org/), triggered by `v-motion` directive.

<div class="w-60 relative">
  <div class="relative w-80 h-80">
    <img
      v-motion
      :initial="{ x: 600, y: 200, scale: 1.5, rotate: -50 }"
      :enter="final"
      class="absolute inset-0"
      src="/logo.png"
      alt=""
    />
    <img
      v-motion
      :initial="{ y: 500, x: -600, scale: 2 }"
      :enter="final"
      class="right-0"
      src="https://sli.dev/logo-circle.png"
      alt=""
    />
    <img
      v-motion
      :initial="{ x: 600, y: 400, scale: 2, rotate: 100 }"
      :enter="final"
      class="absolute inset-0"
      src="https://sli.dev/logo-triangle.png"
      alt=""
    />
  </div>

  <div
    class="text-5xl absolute top-14 left-40 text-[#2B90B6] -z-1"
    v-motion
    :initial="{ x: -80, opacity: 0}"
    :enter="{ x: 0, opacity: 1, transition: { delay: 2000, duration: 1000 } }">
    Slidev
  </div>
</div>


<div class="page">
<div class="abs-br mr-6 mb-1 text-xs left-6 pa-2">
    <a href="https://authmark.org" target="_blank">AuthMark.org</a>
  </div>p

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




<!-- vue script setup scripts can be directly used in markdown, and will only affects current page -->
<script setup lang="ts">
const final = {
  x: 190,
  y: 10,
  rotate: 0,
  scale: 1,
  transition: {
    type: 'spring',
    damping: 10,
    stiffness: 20,
    mass: 2
  }
}
</script>

<div
  v-motion
  :initial="{ x:35, y: 30, opacity: 0}"
  :enter="{ y: 0, opacity: 1, transition: { delay: 3500 } }">

[Learn More](https://sli.dev/guide/animations.html#motion)

</div>

---
layout: image-right
image: /VoiceCloning.jpg
---

### Deep Fakes & Voice Cloning

text...

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


---

# Diagrams

You can create diagrams / graphs from textual descriptions, directly in your Markdown.

<div class="grid grid-cols-4 gap-5 pt-4 -mb-6">

```mermaid {scale: 0.5, alt: 'A simple sequence diagram'}
sequenceDiagram
    Alice->John: Hello John, how are you?
    Note over Alice,John: A typical interaction
```

```mermaid {theme: 'neutral', scale: 0.8}
graph TD
B[Text] --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
```

```mermaid
mindmap
  root((mindmap))
    Origins
      Long history
      ::icon(fa fa-book)
      Popularisation
        British popular psychology author Tony Buzan
    Research
      On effectiveness<br/>and features
      On Automatic creation
        Uses
            Creative techniques
            Strategic planning
            Argument mapping
    Tools
      Pen and paper
      Mermaid
```

```plantuml {scale: 0.7}
@startuml

package "Some Group" {
  HTTP - [First Component]
  [Another Component]
}

node "Other Groups" {
  FTP - [Second Component]
  [First Component] --> FTP
}

cloud {
  [Example 1]
}

database "MySql" {
  folder "This is my folder" {
    [Folder 3]
  }
  frame "Foo" {
    [Frame 4]
  }
}

[Another Component] --> [Example 1]
[Example 1] --> [Folder 3]
[Folder 3] --> [Frame 4]

@enduml
```

</div>

[Learn More](https://sli.dev/guide/syntax.html#diagrams)

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


---

<!-- 
Vision 
-->

<div class="page">
<div class="abs-br mr-6 mb-1 text-xs left-6 pa-2">
    <a href="https://authmark.org" target="_blank">AuthMark.org</a>
  </div>

## Vision

<p>Just like firewalls ans antivirus software, protection against synthetic ai threats &/ verifying inofrmations (mis/dis)
Authmark is positioned to be a must have tool for the future from individuals to big businesses.
</p>

<div class="flex justify-center items-center pa-6">
  <img width="250" height="250" src ="/hero-2.png"/><br>
</div>

We believe in free speech and privacy therefore authenticating Proof if life, voice and deepfakes should be
decentralised and user owned not by big tech.

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

  


