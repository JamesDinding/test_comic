import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import Image from "../_Image/image";

const Description = () => {
  const [showPending, setPending] = useState(true);

  return (
    <>
      <div>
        <div>
          <Image alt="image test" path="" setParentPending={setPending} />
        </div>
        <div>
          <div>title</div>
          <div>author</div>
          <ul>taglist</ul>
          <div>description</div>
          <div>
            <div>
              <div>star</div>
              <div>view</div>
            </div>
            <button>collect</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
