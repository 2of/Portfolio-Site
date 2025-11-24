import React from "react";
import styles from "./styles/SiteInfoCard.module.scss";
import {StandardButton} from "../../UI/StandardLib/StandardButton.jsx";
import {useNavigate} from "react-router-dom";
import {useGlobalContext} from "../../../contexts/GlobalContext.jsx";
import {useModal} from "../../../contexts/ModalContext.jsx";
import getIcon from "../../../utils/Iconifier.jsx";

export const SiteInfoCard = () => {
    const {getLink} = useGlobalContext();

    const { modalState, showModal, hideModal, modalVisible } = useModal();


    const navigate = useNavigate();

    const handleNavAway = () => {

        hideModal();
        navigate("/home");
    }
    return (
        <div className={styles.siteInfoCard}>
            {/*<h3 className={styles.title}>This is my 'rough portfolio site'</h3>*/}

            <p className={styles.desc}>
                There's heaps of stuff in here, follow links yadda yadda. This isis the 'minimal landing page' component I guess...
            </p>

            <p className={styles.desc}>
               Do note that it's also a WIP, many of the writeups are incomplete or I've used generative AI to get the word count to look decent
            </p>

            <div className={styles.links}>


                <StandardButton

                    label={"Site Repo"}
                    icon = {getIcon("GitHub")}

type={"modern_unfilled"}
                    link={getLink("siteRepo")}

                />
                <StandardButton
                    icon = {getIcon("home")}
                    label={"Proper HomePage"}
                    type={"modern_unfilled"}
                    callback={() =>handleNavAway()}

                />

            </div>
            <p className={styles.desc}>
                This page is it's own self contained sorta landing page hence no nav etc
            </p>
            <p className={styles.footer}>
                Thanks for stopping by — cheers, Noah 👋
            </p>
        </div>
    );
};
