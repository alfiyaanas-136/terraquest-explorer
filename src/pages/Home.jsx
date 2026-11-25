import Hero from "../components/Hero/Hero"
import LatestTrips from "../components/LatestTrips/LatestTrips"
import MostPopularDestinations from "../components/MostPopularDestinations/MostPopularDestinations"
import ExploreByExperience from '../components/ExploreByExperience/ExploreByExperience'
import Newsletter from '../components/Newsletter/Newsletter';
import Footer from '../components/Footer/Footer';

const Home = () => {
  return (
    <>
      <Hero />
      <LatestTrips />
      <MostPopularDestinations />
      <ExploreByExperience />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;