import styled from 'styled-components';
import head404 from '../../assets/image/head404.png';
import txtbg404 from '../../assets/image/txtbg404.png';

export const Page404All = styled.div`
    background-color: #494949;
    height: 100%;
    width: 100vw;
    
    .head404{ 
        width:580px; 
        height:234px; 
        margin:0 auto 0 auto; background:url(${head404}) no-repeat; }
    
    .txtbg404{ width:499px; height:169px; margin:10px auto 0 auto; background:url(${txtbg404}) no-repeat;}
    
    .txtbg404 .txtbox{ width:390px; position:relative; top:30px; left:60px;color:#eee; font-size:13px;}
    
    .txtbg404 .txtbox p {margin:5px 0; line-height:18px;}
    
    .txtbg404 .txtbox .paddingbox { padding-top:15px;}
    
    .txtbg404 .txtbox p a { color:#eee; text-decoration:none;}
    
    .txtbg404 .txtbox p a:hover { color:#FC9D1D; text-decoration:underline;}
 
`