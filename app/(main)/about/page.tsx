import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="bg-muted h-full flex justify-center items-center py-20">
      <div className="bg-white/90 dark:bg-black/50 rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-semibold mb-4 text-center">About Us</h1>
        <div className="flex justify-center items-center">
          <p className="text-4xl font-semibold mr-2">Welcome to</p>
          <Image 
            src="/logo-light.png"
            alt="logo"
            width={200}
            height={200}
            className="dark:filter dark:invert"
          />
          <p className="text-4xl font-semibold ml-2"> the Ultimate Gaming Webshop!</p>
        </div>
        <p className="text-xl mb-4">
          We are more than just a store; we are a community of gamers.
        </p>
        <p className="text-xl mb-4">Our Story:</p>
        <p className="text-xl mb-4">
          Founded by passionate gamers, our webshop is dedicated to providing
          you with the latest gaming products and an immersive gaming
          experience.
        </p>
        <p className="text-xl mb-4">Our Mission:</p>
        <p className="text-xl mb-4">
          To offer a wide selection of games, consoles, accessories, and more,
          all while providing exceptional customer service. We strive to create
          a one-stop destination for all your gaming needs.
        </p>
        <p className="text-xl mb-4">Why Choose Us?</p>
        <p className="text-xl mb-4">
          - Handpicked selection of the best games and gear
          <br />
          - Competitive prices and exclusive deals
          <br />
          - Expert recommendations from our gaming enthusiasts
          <br />- Fast and secure worldwide shipping
        </p>
        <p className="text-xl mb-4">
          We&apos;re here to help you level up your gaming experience. Join us
          on this epic adventure!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
