import React, { useContext, useEffect, useState } from "react";
import "./test-modal.scss";
import SwitchAppCheckout from "@switchappgo/switchapp-inline";
import {CHARGE_REQUEST_URL, DEFAULT_ERROR, VERIFY_PAYMENT_URL} from "../../../api/urls";
import api from "../../../api/axios";
import { useDispatch } from "react-redux";
import { getWalletBalance } from "../../../store/actions/walletActions";
import AuthContext from "../../../context/AuthProvider";
import {Link} from "react-router-dom";
import {PrimaryButton} from "../../../components/button";
import {toast} from "react-toastify";

export const TopUpModal = ({currentIndex,form,handleClose}) => {
  const { user } = useContext(AuthContext);
  const [payload, setPayload] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  let switchappClient;

  const handleInitiateTopUp = async () => {
   try{
     setIsLoading(true);
     const response = await generatePayload();
     if(response.success){
         dispatch(getWalletBalance(user));
         toast.success(response.success);
         handleClose(false);
         setIsLoading(false);
     }
     else{
         setPayload(response);
     }
     // console.log(response);
   }catch (error){
     toast.error(error?.response?.data?.error || DEFAULT_ERROR);
     // console.log(error);
       setIsLoading(false);
   }

    //
  };

  const generatePayload = async () => {
    const result = await api.post(CHARGE_REQUEST_URL, { type:currentIndex,
    form: {...form}});
    return result.data;
  };

  const verifyPayment = async (tx_ref) => {
      try {
          setIsLoading(true);
          const response = await api.get(`${VERIFY_PAYMENT_URL}/${tx_ref}`);
          dispatch(getWalletBalance(user));
          toast.success(response.data.success);
          handleClose(false);
      } catch (error) {
          toast.error(error?.response?.data?.error || DEFAULT_ERROR);
          // console.log(error);
          dispatch(getWalletBalance(user));
      }
      setIsLoading(false);
  };



  useEffect(() => {
    if (Object.keys(payload).length === 0) return;
    if(!switchappClient)
    {
      switchappClient = new SwitchAppCheckout({
        publicApiKey: payload.publicKey,
      });
    }
    delete payload.publicKey;
    switchappClient
      .showCheckoutModal({
        ...payload,
        onClose: () => {
            verifyPayment(payload.tx_ref);
            setPayload({});
        },
        onSuccess: () => {
          verifyPayment(payload.tx_ref);
          setPayload({});
        },
      })
      .then((p) => {
        // TO-DO - Verify payment before calling fund endpoint
        // console.log(`Initialized a new top-up`);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return (
    <>
      <Link>
        <PrimaryButton onClick={handleInitiateTopUp} isLoadingMsg="please wait..." size="sm" className="vid" isLoading={isLoading}>{currentIndex === 0?"Buy Unit":"Redeem Voucher"}</PrimaryButton>
      </Link>
    </>
  );
};
