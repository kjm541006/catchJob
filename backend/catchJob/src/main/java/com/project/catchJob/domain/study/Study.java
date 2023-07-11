package com.project.catchJob.domain.study;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.project.catchJob.domain.Member;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = {"member", "studyCommentsList", "studyLikeList", "studyReasonList"})
@Entity
public class Study {

	@Id @GeneratedValue @Column(name = "study_id")
	private Long studyId;
	
	private String sType; // �о�
	
	private String sTitle;
	
	private String sContents;
	
	private String sLoc; // ����
	
	private String sPeriod; // �����Ⱓ
	
	private int sMemCnt; // �����ο�
	
	@Column(insertable = false, updatable = false, columnDefinition = "bigint default 0")
	private int sCnt; // ��ȸ��
	
	@Column(insertable = false, updatable = false, columnDefinition = "bigint default 0")
	private int sLike; // ���ƿ䰹��	
	
	@ManyToOne
	@JoinColumn(name = "member_id", nullable = false, updatable = false)
	private Member member;
	
	public void setMember(Member member) {
		this.member = member;
		member.getStudyList().add(this);
	}

	@OneToMany(mappedBy = "study")
	private List<S_comments> studyCommentsList = new ArrayList<>();
	
	@OneToMany(mappedBy = "study")
	private List<S_like> studyLikeList = new ArrayList<>();	
	
	@OneToMany(mappedBy = "study")
	private List<S_reason> studyReasonList = new ArrayList<>();	
}
