import React from "react";
import CareerTile from "../../UI/DiscreteComponents/CareerTile";

export const CareersCard =  ({careers}) => { 
    return ( 
        <>
        
   {careers.map((c, i) => (


                        <>



                            <CareerTile
                                position={c.position}
                                company={c.company}
                                duration={c.duration}
                                location={c.location}
                                doing={c.doing}
                                techStack={c.coreskills}


                            />

                            {/*{i != career.length - 1 && (*/}

                            {/*    <div className={styles.heightfull}>*/}
                            {/*        {getIcon("left")}*/}

                            {/*    </div>*/}

                            {/*)}*/}

                        </>

                    ))}
        </>

    )
}