import React from 'react';
import { signIn } from "next-auth/react";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
  {
    original: '/medias/1.png',
    thumbnail: '/medias/1.png',
  },
  {
    original: '/medias/2.png',
    thumbnail: '/medias/2.png',
  },
  {
    original: '/medias/3.png',
    thumbnail: '/medias/3.png',
  },
  {
    original: '/medias/4.png',
    thumbnail: '/medias/4.png',
  },
];

const Landing: React.FC = () => {
  return (
    <div className="landing-container">
      <section className="landing-section">
        <p className="landing-text">
          Today Notes helps you manage your daily tasks effortlessly. Stay focused on what matters today, complete tasks efficiently, and boost your productivity.
        </p>
        <button onClick={() => signIn("google")} className="landing-button">
          Sign in with Google
        </button>
      </section>
      <section className="landing-section">
<h2 className="landing-title">Psychology Behind 'Today'</h2>
<p className="landing-text">
  The name 'Today' reflects the principle of focusing on the tasks that matter most today. Human psychology often leads to procrastination, with the tendency to push tasks into the future. Research suggests that tasks seem less intimidating when we break them down into smaller, more immediate goals.
</p>
<p className="landing-text">
  By limiting tasks to today, the app encourages users to focus on what they can achieve now. The concept of 'planning for today before tomorrow' is grounded in behavioral psychology, where creating urgency helps combat procrastination, enhances focus, and boosts productivity. With automatic task expiration, there's no option to 'put it off until tomorrow'—the goal is to complete today’s tasks, making each day more productive and fulfilling.
</p>
      </section>
      <section className="landing-section">
        <h2 className="landing-title">Features</h2>
        <div className="task-list">
          <div className="task">Quickly add new tasks with a single tap.</div>
          <div className="task">Easily mark tasks as done, re-add expired tasks, or delete them.</div>
          <div className="task">Tasks expire automatically after 24 hours, keeping your list fresh.</div>
          <div className="task">Expired tasks are automatically deleted after 48 hours.</div>
          <div className="task">Switch between light and dark modes to suit your preference.</div>
          <div className="task">Get instant feedback with notifications for your actions.</div>
        </div>
      </section>
      <section className="landing-gallery">
        <ImageGallery items={images} showPlayButton={false} />
      </section>
    </div>
  );
};

export default Landing;