package org.katas.bowling;

import java.util.ArrayList;
import java.util.List;

public class BowlingScore {
    private final Line aLine;
    public BowlingScore(String line) {
        this.aLine = new Line(line);
    }

    public int getScore() {
        return aLine.getScore();
    }
}
class Line {
    List<Frame> frames;
    Line(String line) {
        frames = new ArrayList<>();
        var framesAsStr = line.split(" ");
        parseCurrentFrames(framesAsStr);
        completeTo12Frames();
        linkFrames();
    }

    private void linkFrames() {
        for(int i = 0; i<frames.size()-2; ++i) {
            var curr = frames.get(i);
            curr.setNextFrames(frames.get(i+1), frames.get(i+2));
        }
    }

    private void completeTo12Frames() {
        for (int i = 0; i < 12 - frames.size(); ++i) {
            frames.add(new Frame("--"));
        }
    }

    private void parseCurrentFrames(String[] framesAsStr) {
        for (String frame : framesAsStr) {
            frames.add(new Frame(frame));
        }
    }

    public int getScore() {
        return frames.subList(0, 10).stream().map(Frame::getScore).reduce(0, Integer::sum);
    }

    public boolean isPerfect() {
        return frames.stream().allMatch(Frame::isStrike);
    }
}

class Frame {
    private static final int STRIKE_SCORE = 10;
    private static final int SPARE_SCORE = 10;
    private static final int DOUBLE_STRIKE_SCORE = 20;
    private static final int TRIPLE_STRIKE_SCORE = 30;
    List<Throw> allThrows;
    Frame nextFrame;
    Frame frameAfter;

    Frame(String frameAsStr){
        allThrows = new ArrayList<>();
        allThrows.add(new Throw(frameAsStr.charAt(0)));
        if(frameAsStr.length() > 1) {
            allThrows.add(new Throw(frameAsStr.charAt(1)));
        }
    }

    public int getScore() {
        if (isStrike()) {
            return calculateStrikeScore();
        }
        if (isSpare()) {
            return calculateSpareScore();
        }
        return allThrows.stream().map(Throw::getScore).reduce(0, Integer::sum);
    }

    private int calculateSpareScore() {
        if(nextFrame.isStrike()) {
            return SPARE_SCORE + STRIKE_SCORE;
        }
        return SPARE_SCORE + nextFrame.getFirstThrowScore();
    }

    private boolean isSpare() {
        return !isStrike() && allThrows.get(1).isSpare();
    }

    private int calculateStrikeScore() {
        if (nextFrame.isStrike()) {
            if (frameAfter.isStrike()) {
                return TRIPLE_STRIKE_SCORE;
            }
            return DOUBLE_STRIKE_SCORE + frameAfter.getFirstThrowScore();
        }
        if (nextFrame.isSpare()) {
            return STRIKE_SCORE + SPARE_SCORE;
        }
        return STRIKE_SCORE + nextFrame.getScore();
    }

    private int getFirstThrowScore() {
        return allThrows.get(0).getScore();
    }

    public boolean isStrike() {
        return allThrows.get(0).isStrike();
    }

    public void setNextFrames(Frame frame, Frame frame2) {
        nextFrame = frame;
        frameAfter = frame2;
    }
}

class Throw {
    char aThrow;
    Throw(char aThrow) {
        this.aThrow = aThrow;
    }

    public int getScore() {
        if (aThrow >= '0' && aThrow <= '9') {
            return aThrow - 48;
        }
        return 0;
    }

    public boolean isStrike() {
        return aThrow == 'X';
    }

    public boolean isSpare() {
        return aThrow == '/';
    }
}