import React from "react";
import { CenteredContainer } from "../components/Scroll/CenteredContainer";
import { StandardButton } from "../components/UI/StandardButton";
import getIcon from "../utils/Iconifier";
import { useModal } from "../contexts/ModalContext";

export const NotFoundPage = () => {
  const { showModal } = useModal();

  const YoutubeEmbed = (
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/93hq0YU3Gqk"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );

  const openModalForDescr = ({ content }) => {
    showModal({
      title: "Achooo!",
      content: content,
      size: "medium",
    });
  };

  return (
    <CenteredContainer>
      <h1>Uh oh that's a 404!</h1>
      <br />
      <StandardButton
        label="Maybe open the homepage"
        icon={getIcon("right")}
        type="article"
        link="/"
      />
      <br />
      <StandardButton
        label="Open the directory"
        icon={getIcon("right")}
        type="article"
        link="/dir"
      />
      <br />
      <StandardButton
        label="Panda Sneezing"
        icon={getIcon("right")}
        type="article"
        callback={() =>
          openModalForDescr({
            content: <>{YoutubeEmbed}</>,
          })
        }
      />
    </CenteredContainer>
  );
};
