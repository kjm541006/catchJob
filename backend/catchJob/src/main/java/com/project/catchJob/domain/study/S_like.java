package com.project.catchJob.domain.study;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.project.catchJob.domain.Member;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = {"member", "study"})
@Entity
public class S_like {
	
	@Id @GeneratedValue
	private Long sLikId; // 스터디좋아요아이디
	
	@ManyToOne
	@JoinColumn(name = "member_id", nullable = false, updatable = false)
	private Member member;
	
	public void setMember(Member member) {
		this.member = member;
		member.getS_LikeList().add(this);
	}
	
	@ManyToOne
	@JoinColumn(name = "study_id", nullable = false, updatable = false)
	private Study study;
	
	public void setStudy(Study study) {
		this.study = study;
		study.getStudyLikeList().add(this);
	}

}
