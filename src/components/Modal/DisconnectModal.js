import "./style.css";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { connectWallet } from "../../redux/actions";
import * as balanceAction from "../../redux/xummBalance/action";
import * as QRCodeAction from "../../redux/xummQRCode/action";
import * as accountOfferAction from "../../redux/accountOffers/action";
import * as historyOfferAction from "../../redux/historyOffers/action";

const DisconnectModal = props => {
  const dispatch = useDispatch();
  const disconnectWallet = () => {
    dispatch(balanceAction.setBalanceEmpty());
    dispatch(QRCodeAction.setQRCodeDisconnect());
    dispatch(connectWallet(false));
    //clear acc offers content

    dispatch(accountOfferAction.setAccountOffersProcessing());
    dispatch(accountOfferAction.setAccountOffers([]));
    dispatch(accountOfferAction.setStopAccountOffersProcessing());
    //clear history content
    dispatch(historyOfferAction.setHistoryOffersProcessing());
    dispatch(historyOfferAction.setHistoryOffers([]));
    dispatch(historyOfferAction.setStopHistoryOffersProcessing());
    props.onHide();
  };

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Disconnect Wallet
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <h2>Are you sure you want to disconnect?</h2>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className="modalbtn cancel-btn">
          Cancel
        </Button>
        <Button className="modalbtn disconnect-btn" onClick={disconnectWallet}>
          Disconnect
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default DisconnectModal;
