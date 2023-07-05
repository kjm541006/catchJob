package com.project.catchJob.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = {"member", "study"})
@Entity
public class S_comments {

	@Id @GeneratedValue
	private Long sComId; // ���͵��� ���̵�
	
	private String sComContent; // ��� ����
	
	@Column(insertable = false, updatable = false, columnDefinition = "date default now()")
	private Date sComDate; // ��� �ۼ���¥
	
	@ManyToOne
	@JoinColumn(name = "member_id", nullable = false, updatable = false)
	private Member member;
	
	public void setMember(Member member) {
		this.member = member;
		member.getS_CommentsList().add(this);
	}
	
	@ManyToOne
	@JoinColumn(name = "study_id", nullable = false, updatable = false)
	private Study study;
	
	public void setStudy(Study study) {
		this.study = study;
		study.getStudyCommentsList().add(this);
	}	
}