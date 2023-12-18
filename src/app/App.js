import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { Stage, Layer } from 'react-konva';
import { useSelector, useDispatch } from 'react-redux';
import { LeftBullet } from '../entities/LeftBullet';
import { RightBullet } from '../entities/RightBullet';
import { selectLeftTank } from '../features/LeftTank';
import { selectRightTank } from '../features/RightTank';
import { Hill } from '../entities/Hill';
import { LeftTankHull } from '../entities/LeftTankHull';
import { RightTankHull } from '../entities/RightTankHull';
import { InputAngleL } from '../entities/InputAngleL'
import { InputPowerL } from '../entities/InputPowerL';
import { InputAngleR } from '../entities/InputAngleR';
import { InputPowerR } from '../entities/InputPowerR';
import { fireAndAnimateBulletLeft } from './fireAndAnimateBulletLeft';
import { fireAndAnimateBulletRight } from './fireAndAnimateBulletRight';
import { TankThatWonModal } from '../entities/TankWhichWon';
import { useTranslation } from 'react-i18next';
import { showScreen, startGame, endGame } from "../features/RunningGame";
import { isMobile } from 'react-device-detect';
import GameIntro from '../widgets/GameIntro';

function App() {
  const { t, i18n } = useTranslation()
  const isScreenVisible = useSelector((state) => state.game.isScreenVisible);
  const isGameRunning = useSelector((state) => state.game.isGameRunning);
  const [randomDistanceRight, setRandomDistanceRight] = useState(0);
  const [randomDistanceLeft, setRandomDistanceLeft] = useState(0);

  useEffect(() => {
    const minRange = isMobile ? 100 : 200;
    const maxRange = isMobile ? 300 : 400;
    const randomRight = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    const randomLeft = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    setRandomDistanceRight(randomRight);
    setRandomDistanceLeft(randomLeft);
  }, []);
  const [isRulesModalOpen, setRulesModalOpen] = useState(false);

  const toggleRulesModal = () => {
    setRulesModalOpen(!isRulesModalOpen);
  };

  const dispatch = useDispatch();
  const {
    bulletFiredLeft,
    angleLeft,
    powerLeft,
    bulletXLeft,
    bulletYLeft,
    nameLeftTank
  } = useSelector(selectLeftTank);
  const {
    bulletFiredRight,
    angleRight,
    powerRight,
    bulletXRight,
    bulletYRight,
    nameRightTank
  } = useSelector(selectRightTank);
  const { tankRightRect, tankRightEllipse } = useSelector(selectRightTank);
  const { tankLeftRect, tankLeftEllipse } = useSelector(selectLeftTank);
  const layerRef = useRef();
  const animationRef = useRef();
  const [activeTank, setActiveTank] = useState("left");
  const handleButtonClick = () => {
    handleKeyPress({ key: 'Enter' });
  };

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter' && !bulletFiredLeft && !bulletFiredRight) {
        let angle, power, bulletX, bulletY, tankRect, tankEllipse;

        if (activeTank === "left") {
          angle = angleLeft;
          power = powerLeft;
          bulletX = bulletXLeft;
          bulletY = bulletYLeft;
          tankRect = tankRightRect;
          tankEllipse = tankRightEllipse;
        } else {
          angle = angleRight;
          power = powerRight;
          bulletX = bulletXRight;
          bulletY = bulletYRight;
          tankRect = tankLeftRect;
          tankEllipse = tankLeftEllipse;
        }

        if (
          isNaN(angle) ||
          isNaN(power) ||
          angle === "" ||
          power === ""
        ) {
          alert("Please enter valid numeric values for angle or power");
        } else {
          if (activeTank === "left") {
            fireAndAnimateBulletLeft(
              dispatch,
              layerRef,
              animationRef,
              angle,
              power,
              bulletX,
              bulletY,
              tankRightRect, tankRightEllipse, tankLeftRect, tankLeftEllipse
            );
          } else {
            fireAndAnimateBulletRight(
              dispatch,
              layerRef,
              animationRef,
              angle,
              power,
              bulletX,
              bulletY,
              tankRightRect, tankRightEllipse, tankLeftRect, tankLeftEllipse
            );
          }
          setActiveTank(activeTank === "left" ? "right" : "left");
        }
      }
    },
    [
      bulletFiredLeft,
      bulletFiredRight,
      angleLeft,
      powerLeft,
      bulletXLeft,
      bulletYLeft,
      angleRight,
      powerRight,
      bulletXRight,
      bulletYRight,
      activeTank,
      dispatch,
      tankRightRect,
      tankRightEllipse,
      tankLeftRect,
      tankLeftEllipse,
    ]
  );
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const battleSound = new Audio('./battle.mp3');
    if (userInteracted) {
      battleSound.play();
    }
    return () => {
      battleSound.pause();
      battleSound.currentTime = 0;
    };
  }, [userInteracted]);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru")
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
  const handleStartButtonClick = () => {
    dispatch(startGame());
    setUserInteracted(true);
  };
  const formattedNameLeftTank = nameLeftTank ? nameLeftTank.charAt(0).toUpperCase() + nameLeftTank.slice(1) : '';
  const formattedNameRightTank = nameRightTank ? nameRightTank.charAt(0).toUpperCase() + nameRightTank.slice(1) : '';
  const activeTankName = activeTank === "left" ? formattedNameLeftTank : formattedNameRightTank;

  return (
    <div className="wrapper">
      <GameIntro
        isScreenVisible={isScreenVisible}
        toggleLanguage={toggleLanguage}
        toggleRulesModal={toggleRulesModal}
        handleStartButtonClick={handleStartButtonClick}
        isRulesModalOpen={isRulesModalOpen}
        t={t}
      />

      {isGameRunning && (
        <div>
          <div className="menu-player1">
            <p>{formattedNameLeftTank}</p>
            <InputAngleL />
            <InputPowerL />
          </div>
          <p className="info-active-player">{activeTankName} {t("is going to shoot now")}</p>
          <button className="btn-fire" onClick={handleButtonClick}
            tabIndex="0">{t('Fire')}</button>
          <div className="menu-player2">
            <p>{formattedNameRightTank}</p>
            <InputAngleR />
            <InputPowerR />
          </div>
          <div className="stage-container">
            <Stage className="custom-stage" width={window.innerWidth} height={window.innerHeight}>
              <Layer ref={layerRef}>
                <Hill layerRef={layerRef} randomDistanceRight={randomDistanceRight} randomDistanceLeft={randomDistanceLeft} />
                <LeftTankHull randomDistanceLeft={randomDistanceLeft - 30} />
                <LeftBullet />
                <RightTankHull randomDistanceRight={randomDistanceRight - 30} />
                <RightBullet />
              </Layer>
            </Stage>
          </div>
          <div className="footer"></div>
          <TankThatWonModal />
        </div>
      )}
    </div>
  );
}
export default App;

