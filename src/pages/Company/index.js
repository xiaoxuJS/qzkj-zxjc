import React, { useEffect, useRef, useCallback } from 'react';
import { Map, APILoader } from '@uiw/react-amap';
import {
    getcpCompanyFindGeographical
} from '../../api/companyUrl'
import {
    CompanyAll
} from './style';
import {
    message
} from 'antd'


const Company = () => {
    // let map = useRef(null);
    // let marker = useRef(null);
    const mapData = useCallback(
        () => {
            ;(async () => {
                const {code, msg, data} = await getcpCompanyFindGeographical();
                if(code === '20000'){
                    console.log(data);
                }else{
                    message.error(msg);
                }
            })();
        },
        [],
    )
    useEffect(() => {
        mapData();
    }, [mapData])
    //清除

    return <CompanyAll>
        <APILoader akay="3b63cb7203de531a7f542a9307b470c7">
            <Map zoom={5}/>
        </APILoader>
    </CompanyAll>
}

export default Company;