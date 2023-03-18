<!-- lottery -->
<template>
  <div class="lottery-container" :style="style.bg">
    <div class="lottery-layout">
      <div class="lottery-main">
        <div class="lottery-user">
          <div class="lottery-tips">
            {{ maxAwardTips }}（{{ rollLen }} / {{ formatEditNumber(maxNum) }}）
          </div>
          <ul>
            <li class="lottery-item" v-for="(list, index) in rollIdArr" :key="index">
              <div class="lottery-roll">
                <!-- 注意：若图片出现跨域情况，须配置cors，否则会截图失败 -->
                <div class="roll-item"><img :src="list.HeadImg" /></div>
                <div class="roll-item">
                  <span>{{ list.Num }}</span>
                </div>
                <div class="roll-item">
                  <span>{{ list.Name }}</span>
                </div>
                <div class="roll-item">
                  <span>{{ list.Company }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="lottery-btn">
        <div class="btn-func">
          <button @click="beginRoll">开始</button>
          <img v-if="style.year.show" :src="style.year.img" />
          <button @click="stopRoll">抽取</button>
        </div>
      </div>
      <div class="lottery-options">
        <el-form>
          <el-form-item label="本轮奖项">
            <el-select @change="changeAward" v-model="maxAward" placeholder="请选择抽取奖项">
              <el-option
                v-for="item in awardOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  formatEditNumber(item.number)
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单次抽取">
            <el-select @change="changeTimes" v-model="maxTimes" placeholder="请选择单次抽取人数">
              <el-option
                v-for="item in timesOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="rule.show" class="lottery-rule">
        <img :src="rule.img" />
      </div>
      <div v-if="music.show" :class="classMusic" @click="toggleMusic">
        <div class="music-btn"></div>
        <audio loop="loop" preload="auto" ref="musicRef">
          <source :src="music.src" type="audio/mpeg" />
          您的浏览器不支持 audio 标签。
        </audio>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useDB } from './hooks/useDB'
import { useSelect } from './hooks/useSelect'
import { useKeyDown } from './hooks/useKeyDown'
import { useLottery } from './hooks/useLottery'
import { useApp } from './hooks/useApp'
import { useMusic } from './hooks/useMusic'

export default {
  name: 'lottery',
  setup() {
    // 基础配置
    const { rule } = useApp()
    const { music, musicRef, classMusic, toggleMusic } = useMusic()
    const { initial, userData, awardOptions } = useDB()

    // 抽奖相关
    const {
      maxNum,
      maxTimes,
      maxAward,
      rollLen,
      rollIdArr,
      maxAwardTips,
      timesOptions,
      changeTimes,
      changeAward,
      getRand
    } = useSelect({ initial, userData, awardOptions })
    const { beginRoll, stopRoll, style } = useLottery({
      maxNum,
      maxTimes,
      maxAward,
      rollLen,
      rollIdArr,
      maxAwardTips,
      userData,
      getRand
    })

    useKeyDown({ startFunc: beginRoll, stopFunc: stopRoll })

    // 考虑其他奖项抽取人数未定，默认可抽99人
    const formatEditNumber = function (val) {
      if (val && val !== '99') {
        return `${val}人`
      } else {
        return `自选`
      }
    }

    return {
      formatEditNumber,
      rule,
      music,
      musicRef,
      classMusic,
      toggleMusic,
      maxNum,
      maxTimes,
      maxAward,
      rollLen,
      rollIdArr,
      maxAwardTips,
      timesOptions,
      changeTimes,
      awardOptions,
      changeAward,
      style,
      beginRoll,
      stopRoll
    }
  }
}
</script>

<style lang="scss">
.lottery-options {
  .el-form-item__label {
    color: rgba(227, 183, 27, 0.9);
  }
  .el-input__inner {
    background-color: rgba(138, 9, 0, 0.6);
    color: rgba(227, 183, 27, 0.9);
    border: none;
  }
}
</style>

<style lang="scss" scoped>
$baseColor: rgba(227, 183, 27, 0.9);
@keyframes rotateMusic {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.lottery-container {
  height: 100%;
  overflow: hidden;
  position: relative;
  .lottery-layout {
    position: relative;
    width: 100%;
    height: 100%;
    .lottery-main {
      width: 66%;
      position: absolute;
      left: 50%;
      top: 25%;
      transform: translate3d(-50%, 0, 0);
      z-index: 2;
      .lottery-item {
        height: 7.6vh;
        line-height: 7.6vh;
        margin-top: 1%;
        text-align: center;
        background-image: url('../../assets/images/roll.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
        position: relative;
        .lottery-roll {
          display: flex;
          .roll-item {
            width: 20%;
            font-size: 3.6vh;
            display: flex;
            justify-content: center;
            align-items: center;
            &:last-child {
              width: 40%;
            }
            span {
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
            img {
              border-radius: 50%;
              height: 5.6vh;
              border: 1px solid #ccc;
            }
          }
        }
      }
      .lottery-tips {
        font-size: 3vh;
        color: $baseColor;
        text-align: center;
        margin-bottom: 2%;
      }
    }
    .lottery-btn {
      position: absolute;
      width: 66%;
      left: 50%;
      bottom: 12%;
      transform: translate3d(-50%, 0, 0);
      z-index: 2;
      .btn-func {
        padding: 0 15%;
        display: flex;
        justify-content: space-around;
        button {
          background-image: url('../../assets/images/button.png');
          background-repeat: no-repeat;
          background-size: cover;
          background-position-x: -4px;
          color: #fff;
          padding: 1vh 3.6vh;
          margin: 0 1%;
          font-size: 2.6vh;
          border-radius: 7px;
          outline: none;
          cursor: pointer;
          &:hover {
            color: rgba(227, 183, 27, 0.9);
          }
        }
      }
    }
    .lottery-options {
      position: absolute;
      width: 15%;
      left: 1%;
      bottom: 7%;
      color: $baseColor;
      font-size: 1.8vh;
      z-index: 1;
    }
    .lottery-rule {
      position: absolute;
      right: -6%;
      bottom: 11%;
      z-index: 1;
      img {
        width: 30%;
        float: left;
        margin-right: 2%;
      }
    }
    .lottery-music {
      position: absolute;
      left: 2.5%;
      top: 6.5%;
      cursor: pointer;
      .music-btn {
        width: 3em;
        height: 3em;
        background: url('../../assets/images/music.png') no-repeat center center;
        background-size: contain;
        animation: rotateMusic 1.2s linear infinite;
      }
      &.stoped {
        .music-btn {
          animation-play-state: paused;
        }
      }
    }
  }
}
</style>
