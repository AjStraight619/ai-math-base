import Image from 'next/image'
import React from 'react'

const Hero = () => (
  <section id="home" className="container mt-24 md:mt-16">
    <div className="flex md:flex-row flex-col items-center justify-center w-full h-full">
      <div className="flex-1 w-full flex items-center justify-between">
        <div className="relative">
          <h1 className="font-mono text-lg px-8 sm:text-[52px] leading-[30px] sm:leading-[60px] md:leading-[75px] flex-1 font-semibold">
            <span>The Next</span>
            <br className="hidden sm:block" />{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-600 font-semibold">
              Generation <br />
            </span>
            <span>Math Tool</span>
          </h1>
          <div className="absolute inset-0 -z-50 bg-gradient-to-b from-cyan-500 to-blue-300 filter blur-[100px] opacity-20 h-[75%]" />

          <p className="text-muted-foreground text-sm md:text-lg max-w-[470px] mt-5 font-serif">
            Dive into the future of learning with our innovative math tutoring
            app, where the latest AI technology and the computational prowess of
            Wolfram Alpha come together to transform your study experience.
          </p>
        </div>

        <div className="relative">
          <Image
            src="/robot.svg"
            alt="robot hand"
            priority={true}
            quality={95}
            width={500}
            height={600}
            className="w-auto h-auto"
          />
          {/* <div className="absolute inset-0 -z-50 bg-gradient-to-b from-cyan-500 to-blue-300 filter blur-3xl opacity-20" /> */}
        </div>
      </div>
    </div>
  </section>
)
export default Hero
