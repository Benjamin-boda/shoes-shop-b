import React from "react";
import {Help} from "../../components/Help";
import {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

const { asFragment } = render(<Help />)

test("should match the snapshot", () => {
    
    expect(asFragment(<Help/>)).toMatchSnapshot()
})

test("should contain this text", () => {
    const { getByText } = render(<Help />)

    expect(getByText("Habet ad conpulit quae castrisque adtributo Bostram repellendos opima contigua castrisque Nabataeis habet castellis obtemperare Bostram Traianus veterum obtemperare Parthos saltus et Gerasam vicinarum hanc legibus veterum per veterum conpulit cum Mediam cum inter cum Gerasam atque Gerasam quoque cautissimas Parthos vicinarum civitates est conserta marte cautissimas Arabia oppida castellis gentium ingentes conserta sollicitudo provinciae inter inposito adtributo Parthos conmerciorum vicinarum et quae saltus habet gentium rectoreque urgeret urgeret latere et quae excursus murorum quaedam civitates erexit provinciae sollicitudo quoque validis adtributo et veterum adtributo Bostram quaedam et legibus cautos et sollicitudo atque ingentes oppleta urgeret est contunso Traianus conserta."))
    .toBeTruthy()
})