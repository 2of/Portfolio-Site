import react from 'react'
import {StandardTab} from "../../UI/StandardTab.jsx";
import React from "react";

import styles from "./styles/MobileCareerQualscard.module.scss";
import CareerTile from "../../UI/DiscreteComponents/CareerTile.jsx";
import QualificationTile from "../../UI/DiscreteComponents/QualificationTile.jsx";
import getIcon from "../../../utils/Iconifier.jsx";

export const MobileCareerQualscard = ({career,quals}) => {


    const tabs = {
        Qualifications: () => (
            <div className={styles.careerstack}>
                {quals.map((qual, i) => (

                    <>
                        <QualificationTile
                            title={qual.title}
                            field={qual.field}
                            gpatag={qual.gpatag}
                            institution={qual.where}
                            year={qual.year}



                        />
                        {i != quals.length - 1 && (

                            <div className={styles.heightfull}>
                                {getIcon("plus")}

                            </div>

                        )}



                    </>

                ))}
            </div>
        ),
        Career: () => (
            <div className={styles.careerstack}>


                {career.map((c, i) => (


                    <>



                        <CareerTile
                            position={c.position}
                            company={c.company}
                            duration={c.duration}
                            location={c.location}
                            doing={c.doing}
                            techStack={c.coreskills}
                            openasmodal={true}


                        />


                    </>

                ))}

            </div>
        )
    }
    return (

        <div className={styles.pageContainer}>





        <StandardTab tabs={tabs} variant={"mobile"} tabPosition={ "bottom"}>

        </StandardTab>
        </div>
    )

}





