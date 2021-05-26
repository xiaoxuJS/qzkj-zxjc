import styled from "styled-components";

export const FastAndOperationAll = styled.div`
    display: flex;
`
export const FastAndOperationRight = styled.div`
    flex: 3;
    display: flex;
    flex-flow: column;
`
export const FastAndOperationIcon = styled.div`
    flex: 3;
    display: flex;
    .addIcon{
        flex: 1;
        text-align:center;
        img{
            height: 64px;
            width: 64px;
            text-align:center;
        }
        img:hover{
            cursor:pointer
        }
        p{
            text-align:center;
        }
    }
    
`