import styled from 'styled-components';

export const Loading = styled.div`
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        color: #7159c1;
        font-size: 16px;
        text-decoration: none;
    }

    img {
        width: 120px;
        border-radius: 50%;
        margin-top: 50px;
    }

    h1 {
        font-size: 28px;
        margin-top: 10px;
    }

    p {
        margin-top: 5px;
        font-size: 20px;
        color: #666;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }
`;
export const Filter = styled.form`
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    select {
        border: 1px solid #7159c1;
        padding: 10px 10px;
        font-size: 14px;
        border-radius: 4px;
        text-align: center;
    }
`;
export const SubmitButton = styled.button`
    background: #7159c1;
    border: 0;
    padding: 0 15px;
    margin-left: 10px;
    border-radius: 4px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const IssueList = styled.ul`
    padding-top: 30px;
    margin-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;
        border: 1px solid #eee;
        border-radius: 4px;

        & + li {
            margin-top: 10px;
        }
    }

    img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #eee;
    }

    div {
        flex: 1;
        margin-left: 15px;

        strong {
            font-size: 16px;

            a {
                text-decoration: none;
                color: #333;
                &:hover {
                    color: #7159c1;
                }
            }
            span {
                background: #eee;
                color: #333;
                border-radius: 3px;
                font-size: 12px;
                font-weight: 600;
                height: 20px;
                padding: 3px 4px;
                margin-left: 10px;
            }
        }
        p {
            margin-top: 5px;
            font-size: 12px;
            color: #999;
        }
    }
`;
export const Pages = styled.div`
    margin-top: 25px;
    display: flex;
    justify-content: center;

    button {
        font-size: 25px;
        color: #7351c1;
        cursor: pointer;
        border: none;
        background: none;
    }

    span {
        margin-left: 30px;
        margin-right: 30px;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        padding: 5px 15px;
        background: #7159c1;
        border-radius: 4px;
    }
`;
