import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaArrowRight } from "react-icons/fa6";

const About = () => {
  return (
    <div className={"minDimensions bg-background xPadding yPadding"}>
      <div className={"pb-8"}>
        <h1 className={"font-bold text-large"}>Search</h1>
        <p>
          Looking for something specific? Our gallery makes it easy to find the
          perfect piece that speaks to you. Use the search to uncover hidden
          gems, explore different styles, and bring your vision to life.
        </p>
      </div>
      <div className={"w-full flex justify-center"}>
        <div className={"w-full sm:w-[500px] flex gap-4"}>
          <Input placeholder={"Artist, Title, Style..."} />
          <Button variant={"outline"}>
            <FaArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
